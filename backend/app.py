# from application import app
from flask import request, jsonify
from flask import Flask

from .decision_engine import engine
from .accounting_providers import accounting

app = Flask(__name__)

@app.route('/applyloan', methods=['POST'])
def apply_loan():
    data = request.get_json()
    loan_amount = data.get("loan_amount")
    # Extract user-selected accounting software
    selected_provider = data.get('selected_provider')

    # Fetch the balance sheet from account provider
    balance_sheet = accounting.get_balance_sheet(selected_provider)

    # Calculate preAssessment value based on rules
    pre_assessment = calculate_pre_assessment(balance_sheet, loan_amount)

    # Prepare data for decision engine
    decision_data = {
        "business_details": {
            "name": data.get('business_name'),
            "year_established": data.get('year_established')
        },
        "profit_loss_summary": calculate_profit_loss_summary(balance_sheet),
        "preAssessment": pre_assessment
    }

    # Simulate interaction with decision engine
    approval = engine.simulate_decision_engine_interaction(decision_data)

    return jsonify({"approval": approval})


def calculate_pre_assessment(balance_sheet, loan_amount):
    # Implement preAssessment calculation rules
    profit_in_last_12_months = any(entry['profitOrLoss'] > 0 for entry in balance_sheet[-12:])
    # average_asset_value = 100
    average_asset_value = sum(entry['assetsValue'] for entry in balance_sheet) / len(balance_sheet)
    # # Default preAssessment value
    pre_assessment = 20
    # Calculate preAssessment based on rules
    if profit_in_last_12_months:
        pre_assessment = 60
    if average_asset_value > loan_amount:
        pre_assessment = 100
    print(pre_assessment)
    return pre_assessment

def calculate_profit_loss_summary(balance_sheet):
    # Implement logic to calculate profit/loss summary
    # Return a summary of profit/loss by year
    return "summary"


if __name__ == '__main__':
    app.run()
