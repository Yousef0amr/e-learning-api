import { DataTypes, Model } from "sequelize";

class ChargeCode extends Model {
  async generateCode(sequelize) {

    // Fetch the next value from the sequence
    const [results] = await sequelize.query(`SELECT nextval('charge_code_sequence') AS code`);

    // Check if results are valid
    if (!results || results.length === 0 || results[0].code === null) {
      throw new Error("Failed to fetch sequence value.");
    }

    const nextSeqValue = results[0].code;

    // Get the current timestamp (e.g., last 2 digits of the year)
    const year = new Date().getFullYear().toString().slice(-2); // Last 2 digits of current year

    // Combine the sequence and year to form an 11-digit code
    const generatedCode = `${nextSeqValue}${year}`;

    // Check if the generated code is valid
    if (isNaN(generatedCode) || generatedCode.length !== 11) {
      throw new Error("Generated code is invalid.");
    }

    this.code = parseInt(generatedCode, 10);

  }
}

// Function to ensure sequence creation
const charge_code_sequence = async (sequelize) => {
  try {

    await sequelize.query(`
        DO $$ 
        BEGIN
          IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = 'charge_code_sequence') THEN
            CREATE SEQUENCE charge_code_sequence
            AS BIGINT  -- Ensure the sequence is BIGINT
            START WITH 100000000  -- Start with 9-digit sequence
            INCREMENT BY 1
            MINVALUE 100000000
            MAXVALUE 999999999  -- Cap the sequence at 9 digits
            CYCLE;  -- Cycle when max value is reached
          END IF;
        END $$;
      `);

  } catch (error) {
    console.error("Error creating charge_code_sequence:", error);
  }
};

const ChargeCodeModel = async (sequelize) => {
  await charge_code_sequence(sequelize);

  return ChargeCode.init(
    {
      charge_code_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      code: {
        type: DataTypes.BIGINT,
        unique: true,
        allowNull: false,
        defaultValue: 0
      },
      chargeAmount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "charge_codes",
      hooks: {
        beforeCreate: async (chargeCode, options) => {
          // Generate the code
          await chargeCode.generateCode(sequelize);
        },
      }
    },
  );
};

export default ChargeCodeModel;
