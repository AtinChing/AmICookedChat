def llm_grouping():
    prompt = """You are an assistant that understands human attention.

Below is a list of user activities including timestamps, summaries, and contexts. Group them into logical task blocks based on intent, even if the mental_context varies. Include only 3–5 blocks per batch.

Respond with a JSON array of grouped lists."""