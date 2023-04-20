import random

VALUES = ["Approved", "Rejected"]

# This simulates the decision engine
# Right now, it returns the random value from VALUES stated above

def simulate_decision_engine_interaction(decision_data):
    return random.choice(VALUES)