const IncomeStatement = require("../Model/IncomeStatementModel");
const userQuarter2 = require("../Model/userQuarter2Model");
const UserIncomeStatement = require("../Model/userIncomeModel");

// Create income statement

exports.createIncomeStatement = async (req, res) => {
  try {
    console.log(req.body);
    // console.log("HEllo");
    const incomeStatement = await IncomeStatement.create(req.body);

    res.status(201).json({ incomeStatement });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getIncomeStatement = async (req, res) => {
  try {
    const incomeStatement = await IncomeStatement.find();

    res.status(201).json(incomeStatement[0].income);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.createIncomeStatement = async (req, res) => {
  try {
    console.log(req.body);
    // console.log("HEllo");
    const incomeStatement = await IncomeStatement.create(req.body);

    res.status(201).json({ incomeStatement });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.createIncomeStatementForUser = async (req, res) => {
  try {
    let quarter2 = await userQuarter2.findOne({ id: req.user._id });
    let incomeData = await IncomeStatement.find({});
    incomeData = incomeData[0].income;

    let quarters = [];

    if (quarter2) {
      quarters.push(quarter2);
    }

    let incomes = [];
    for (let index = 0; index < 3; index++) {
      if (quarters[index]) {
        let opportunities = 0;
        let opportunityCost = 0;
        let OtherCost = 0;

        if (quarters[index].option1.selected) {
          opportunities += quarters[index].option1.income;
          opportunityCost += quarters[index].option1.cost;
          OtherCost += quarters[index].option1.otherCost;
        }
        if (quarters[index].option2.selected) {
          opportunities += quarters[index].option2.cost;
          opportunityCost += quarters[index].option2.cost;
          OtherCost += quarters[index].option2.otherCost;
        }
        if (quarters[index].option3.selected) {
          opportunities += quarters[index].option3.income;
          opportunityCost += quarters[index].option3.cost;
          OtherCost += quarters[index].option3.otherCost;
        }

        console.log("OTHERCOST", OtherCost);

        // console.log(incomeData[index].Revenues["Sales From Home"]);

        let data;
        data = {
          Revenues: {
            "Sales From Home": incomeData[index]["Revenues"]["Sales From Home"],
            "Additional Income":
              incomeData[index]["Revenues"]["Additional Income"],
            Opportunities: opportunities,
            Grants: incomeData[index]["Revenues"]["Grants"],
            Loans: incomeData[index]["Revenues"]["Loans"],
            "Other Income": incomeData[index]["Revenues"]["Other Income"],
            "Total Revenue": 0,
          },
        };

        // console.log(data);

        let totalRevenue = 0,
          totalExpensesAndCosts = 0;
        for (let key in data.Revenues) {
          totalRevenue += data.Revenues[key];
        }

        let CostAndExpenses = {
          "Cost Of Goods Sold":
            incomeData[index]["Expenses And Costs"]["Cost Of Goods Sold"],
          Lease: incomeData[index]["Expenses And Costs"].Lease,
          Marketing: incomeData[index]["Expenses And Costs"].Marketing,
          "Budjeted Salaries":
            incomeData[index]["Expenses And Costs"]["Budjeted Salaries"],
          "Extra Expenditure":
            incomeData[index]["Expenses And Costs"]["Extra Expenditure"],
          "Delivery Van Expenses":
            incomeData[index]["Expenses And Costs"]["Delivery Van Expenses"],
          "Initial Expenditure":
            incomeData[index]["Expenses And Costs"]["Initial Expenditure"],
          "Opportunity Costs": opportunityCost,
          Travel: incomeData[index]["Expenses And Costs"]["Travel"],
          Training: incomeData[index]["Expenses And Costs"]["Training"],
          "Loan Repayment":
            incomeData[index]["Expenses And Costs"]["Loan Repayment"],
          "Professional Fees":
            incomeData[index]["Expenses And Costs"]["Professional Fees"],
          "Sundry Expenses":
            incomeData[index]["Expenses And Costs"]["Sundry Expenses"],
          "Other Cost": OtherCost,
        };

        for (let key1 in CostAndExpenses) {
          totalExpensesAndCosts += CostAndExpenses[key1];
        }

        CostAndExpenses = {
          ...CostAndExpenses,
          "Total Cost And Expenses": totalExpensesAndCosts,
        };

        // // console.log(totalRevenue);
        data.Revenues = {
          ...data.Revenues,
          "Total Revenue": totalRevenue,
        };

        data["Expenses And Costs"] = CostAndExpenses;
        // console.log(data);

        data = {
          ...data,
          EBITIDA:
            data.Revenues["Total Revenue"] -
            data["Expenses And Costs"]["Total Cost And Expenses"],
          Depreciation: incomeData[index]["Depreciation"],
          EBIT:
            data.Revenues["Total Revenue"] -
            data["Expenses And Costs"]["Total Cost And Expenses"] +
            incomeData[index]["Depreciation"],
          Interest: incomeData[index]["Interest"],
          "PRETAX INCOME":
            data.Revenues["Total Revenue"] -
            data["Expenses And Costs"]["Total Cost And Expenses"] +
            incomeData[index]["Depreciation"] -
            incomeData[index]["Interest"],
          "Net Operating Loss":
            data.Revenues["Total Revenue"] -
              data["Expenses And Costs"]["Total Cost And Expenses"] +
              incomeData[index]["Depreciation"] -
              incomeData[index]["Interest"] <
            0
              ? data.Revenues["Total Revenue"] -
                data["Expenses And Costs"]["Total Cost And Expenses"] +
                incomeData[index]["Depreciation"] -
                incomeData[index]["Interest"] +
                0
              : 0,
        };

        data = {
          ...data,
          "Use Of Net Operating Loss":
            data["Net Operating Loss"] < 0
              ? 0
              : Math.min(data["PRETAX INCOME"], data["Net Operating Loss"]),
        };
        data = {
          ...data,
          "Taxable Income":
            data["PRETAX INCOME"] - data["Use Of Net Operating Loss"] < 0
              ? 0
              : data["PRETAX INCOME"] - data["Use Of Net Operating Loss"],
          "Income Tax Expense": incomeData[index]["Income Tax Expense"],
        };

        data = {
          ...data,
          "NET INCOME": data["PRETAX INCOME"] - data["Income Tax Expense"],
        };

        incomes.push(data);
      }
    }
    if (incomes.length > 0) {
      let incomeDetails = {
        id: req.user._id,
        income: incomes,
      };
      const incomeStatement = await UserIncomeStatement.create(incomeDetails);

      res.status(201).json({ incomeStatement });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

exports.getUserIncomeStatement = async (req, res) => {
  try {
    const incomeStatement = await UserIncomeStatement.findOne({
      id: req.user._id,
    });

    res.status(201).json(incomeStatement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
