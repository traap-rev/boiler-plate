const Question = (sequelize, DataTypes) => {
  const Question = sequelize.define(
    'question',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      quest: {
        type: DataTypes.STRING,
      },
      answer: {
        type: DataTypes.STRING,
      },
      difficulty: {
        type: Sequelize.ENUM,
        values: ['insane', 'hard', 'medium' ,'easy']
      }
    },
    {
      timestamps: true,
      freezeTableName: true,
    }
  );

  Question.sync();
  return Question;
};

export default Question;