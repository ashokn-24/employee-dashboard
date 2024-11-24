const Counter = require("../models/counter.model");
const Employee = require("../models/employee.model");

const getNextSequenceValue = async (counterName) => {
  let counter = await Counter.findOne({ name: counterName });

  if (!counter) {
    const maxExistingValue = await Employee.findOne({})
      .sort({ f_id: -1 })
      .select("f_id");

    const initialSeqValue = maxExistingValue ? maxExistingValue.f_id : 0;

    counter = await Counter.create({
      name: counterName,
      seqValue: initialSeqValue,
    });
  }

  counter = await Counter.findOneAndUpdate(
    { name: counterName },
    { $inc: { seqValue: 1 } },
    { new: true }
  );

  return counter.seqValue;
};

module.exports = getNextSequenceValue;
