
# Documentation
- Class name: LLMChatBot
- Category: SALT/Language Toolkit/Querying
- Output node: False

LLMChatBot节点旨在通过利用大型语言模型（LLMs）实现交互式聊天对话。它结合用户输入、上下文信息和预设参数来生成对话回应，以模拟自然而生动的对话体验。

# Input types
## Required
- llm_model
    - 指定用于聊天对话的大型语言模型，包括相关配置和设置。这个参数决定了聊天机器人的基础能力和表现。
    - Comfy dtype: LLM_MODEL
    - Python dtype: Dict[str, Any]
- llm_context
    - 提供特定于聊天会话的额外上下文或设置，增强模型的理解能力和回应准确性。这有助于定制化聊天体验。
    - Comfy dtype: LLM_CONTEXT
    - Python dtype: Any
- prompt
    - 用户的输入消息或问题，作为触发聊天机器人生成回复的关键。这是每轮对话的核心输入。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- reset_engine
    - 重置聊天引擎的标志，用于开始新的对话线程或清除历史记录。这对于管理长期对话或切换话题很有用。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- user_nickname
    - 用户的自定义昵称，用于个性化聊天会话。这增加了对话的亲和力。
    - Comfy dtype: STRING
    - Python dtype: str
- system_nickname
    - 聊天机器人的自定义昵称，通过添加个性化层面来增强对话体验。这有助于塑造机器人的独特性格。
    - Comfy dtype: STRING
    - Python dtype: str
- char_per_token
    - 定义每个令牌的平均字符数，用于聊天会话中的分词目的。这影响了模型对输入文本的处理方式。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- chat_history
    - 用户和聊天机器人之间累积的对话历史，包括所有交换的消息。这提供了完整的对话上下文。
    - Comfy dtype: STRING
    - Python dtype: List[Dict[str, Any]]
- response
    - 聊天机器人对用户最新提示的直接回应。这是每轮对话中机器人生成的核心输出。
    - Comfy dtype: STRING
    - Python dtype: str
- chat_token_count
    - 聊天会话中使用的令牌总数，反映了对话的复杂性和长度。这有助于监控和管理对话的规模。
    - Comfy dtype: INT
    - Python dtype: int


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
