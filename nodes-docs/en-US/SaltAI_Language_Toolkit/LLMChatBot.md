---
tags:
- LLM
- LLMChat
---

# ∞ Chat Engine
## Documentation
- Class name: `LLMChatBot`
- Category: `SALT/Language Toolkit/Querying`
- Output node: `False`

The LLMChatBot node is designed to facilitate interactive chat sessions using large language models (LLMs). It leverages a combination of user inputs, context, and predefined settings to generate conversational responses, aiming to simulate a natural and engaging dialogue experience.
## Input types
### Required
- **`llm_model`**
    - Specifies the large language model to be used for the chat session, including any relevant configurations and settings.
    - Comfy dtype: `LLM_MODEL`
    - Python dtype: `Dict[str, Any]`
- **`llm_context`**
    - Provides additional context or settings specific to the chat session, enhancing the model's understanding and response accuracy.
    - Comfy dtype: `LLM_CONTEXT`
    - Python dtype: `Any`
- **`prompt`**
    - The user's input message or question to which the chatbot will respond, serving as the trigger for generating a reply.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`reset_engine`**
    - A flag to reset the chat engine, useful for starting a new conversation thread or clearing history.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`user_nickname`**
    - A customizable nickname for the user, used to personalize the chat session.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`system_nickname`**
    - A customizable nickname for the chatbot, enhancing the conversational experience by adding a layer of personalization.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`char_per_token`**
    - Defines the average number of characters per token, used for tokenization purposes in the chat session.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`chat_history`**
    - Comfy dtype: `STRING`
    - The accumulated conversation history between the user and the chatbot, including all exchanged messages.
    - Python dtype: `List[Dict[str, Any]]`
- **`response`**
    - Comfy dtype: `STRING`
    - The chatbot's direct response to the user's latest prompt.
    - Python dtype: `str`
- **`chat_token_count`**
    - Comfy dtype: `INT`
    - The total number of tokens used in the chat session, reflecting the conversation's complexity and length.
    - Python dtype: `int`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMChatBot:
    def __init__(self):
        self.chat_history = []
        self.history = []
        self.token_map = {} 

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "llm_model": ("LLM_MODEL", ),
                "llm_context": ("LLM_CONTEXT", ),
                "prompt": ("STRING", {"multiline": True, "dynamicPrompt": False}),
            },
            "optional": {
                "reset_engine": ("BOOLEAN", {"default": False}),
                "user_nickname": ("STRING", {"default": "User"}),
                "system_nickname": ("STRING", {"default": "Assistant"}),
                "char_per_token": ("INT", {"min": 1, "default": 4})
            }
        }

    RETURN_TYPES = ("STRING", "STRING", "INT")
    RETURN_NAMES = ("chat_history", "response", "chat_token_count")

    FUNCTION = "chat"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Querying"

    def chat(self, llm_model: Dict[str, Any], llm_context:Any, prompt: str, reset_engine:bool = False, user_nickname:str = "User", system_nickname:str = "Assistant", char_per_token:int = 4) -> str:

        if reset_engine:
            self.chat_history.clear()
            self.history.clear()
            self.token_map.clear()

        max_tokens = llm_model.get("max_tokens", 4096)
        using_mock_tokenizer = False
        try:
            tokenizer = tiktoken.encoding_for_model(llm_model.get('llm_name', 'gpt-3-turbo'))
        except Exception:
            using_mock_tokenizer = True
            tokenizer = MockTokenizer(max_tokens, char_per_token=char_per_token)

        if not self.chat_history:
            system_prompt = getattr(llm_model['llm'], "system_prompt", None)
            if system_prompt not in (None, ""):
                initial_msg = ChatMessage(role=MessageRole.SYSTEM, content=system_prompt)
                self.chat_history.append(initial_msg)
                self.token_map[0] = tokenizer.encode(system_prompt)

        # Tokenize and count initial tokens
        cumulative_token_count = 0
        for index, message in enumerate(self.chat_history):
            if index not in self.token_map:
                self.token_map[index] = tokenizer.encode(message.content)
            #if not using_mock_tokenizer:
            cumulative_token_count += len(self.token_map[index])
            #else:
            #    cumulative_token_count += tokenizer.count(self.token_map[index])

        # Prune messages from the history if over max_tokens
        index = 0
        while cumulative_token_count > max_tokens and index < len(self.chat_history):
            tokens = self.token_map[index]
            token_count = len(tokens) #if not using_mock_tokenizer else tokenizer.count(tokens)
            if token_count > 1:
                tokens.pop(0)
                self.chat_history[index].content = tokenizer.decode(tokens)
                cumulative_token_count -= 1
            else:
                cumulative_token_count -= token_count
                self.chat_history.pop(index)
                self.token_map.pop(index)
                for old_index in list(self.token_map.keys()):
                    if old_index > index:
                        self.token_map[old_index - 1] = self.token_map.pop(old_index)
                continue
            index += 1
                
        history_string = ""
        reply_string = ""
        documents = []

        # Build prior history string
        for history in self.history:
            user, assistant, timestamp = history
            history_string += f"""[{user_nickname}]: {history[user]}

[{system_nickname}]: {history[assistant]}

"""
        # Spoof documents -- Why can't we just talk to a modeL?
        documents = [Document(text="null", extra_info={})]

        index = VectorStoreIndex.from_documents(
            documents, 
            service_context=llm_context,
            transformations=[SentenceSplitter(chunk_size=1024, chunk_overlap=20)]
        )
        chat_engine = index.as_chat_engine(chat_mode="best")

        response = chat_engine.chat(prompt, chat_history=self.chat_history)

        response_dict = {
            user_nickname: prompt, 
            system_nickname: response.response,
            "timestamp": str(time.time())
        }

        user_cm = ChatMessage(role=MessageRole.USER, content=prompt)
        system_cm = ChatMessage(role=MessageRole.SYSTEM, content=response.response)
        self.chat_history.append(user_cm)
        self.chat_history.append(system_cm)

        self.history.append(response_dict)

        reply_string = response.response

        history_string += f"""[{user_nickname}]: {prompt}

[{system_nickname}]: {response.response}"""
            
        pprint(self.chat_history, indent=4)

        return (history_string, reply_string, cumulative_token_count)

```
