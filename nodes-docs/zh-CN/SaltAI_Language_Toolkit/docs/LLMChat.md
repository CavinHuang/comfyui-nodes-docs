
# Documentation
- Class name: LLMChat
- Category: SALT/Language Toolkit/Querying
- Output node: False

LLMChat节点通过处理用户输入并生成响应来促进与语言模型的交互对话。它利用文档嵌入、消息模板和查询引擎来模拟聊天环境，实现动态和上下文感知的对话。

# Input types
## Required
- llm_model
    - 指定用于生成响应和处理文档的语言模型及其嵌入模型的字典。
    - Comfy dtype: LLM_MODEL
    - Python dtype: Dict[str, Any]
- prompt
    - 用户向语言模型输入的问题或内容，作为生成响应的基础。
    - Comfy dtype: STRING
    - Python dtype: str

## Optional
- llm_context
    - 语言模型的可选上下文信息，用于使响应更贴近给定场景。
    - Comfy dtype: LLM_CONTEXT
    - Python dtype: Any
- llm_message
    - 提供对话上下文或历史的聊天消息列表，以增强模型响应的相关性。
    - Comfy dtype: LIST
    - Python dtype: List[ChatMessage]
- llm_documents
    - 可选的文档，用于丰富对话上下文或作为语言模型的参考材料。
    - Comfy dtype: DOCUMENT
    - Python dtype: List[Any]

# Output types
- response
    - 语言模型对用户提示的生成响应。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class LLMChat:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "llm_model": ("LLM_MODEL", ),
                "prompt": ("STRING", {"multiline": True, "dynamicPrompts": False}),
            },
            "optional": {
                  "llm_context": ("LLM_CONTEXT", ),
                  "llm_message": ("LIST", {}),
                  "llm_documents": ("DOCUMENT", {}),
            }
        }

    RETURN_TYPES = ("STRING", )
    RETURN_NAMES = ("response", )

    FUNCTION = "chat"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Querying"

    def chat(self, llm_model:Dict[str, Any], prompt:str, llm_context:Any = None, llm_message:List[ChatMessage] = None, llm_documents:List[Any] = None) -> str:

        embed_model = llm_model.get('embed_model', None)

        # Spoof documents -- Why can't we just talk to a modeL?
        if not llm_documents:
            documents = [Document(text="null", extra_info={})]
        else:
            documents = llm_documents

        index = VectorStoreIndex.from_documents(
            documents, 
            embed_model=embed_model,
            service_context=llm_context,
            transformations=[SentenceSplitter(chunk_size=1024, chunk_overlap=20)]
        )
        
        if not llm_message:
            llm_message = [ChatMessage(MessageRole.USER, content="")]

        if not prompt.strip():
            prompt = "null"

        template = ChatPromptTemplate(message_templates=llm_message)

        query_engine = index.as_query_engine(llm=llm_model.get("llm", None), embed_model=embed_model, text_qa_template=template)

        response = query_engine.query(prompt)

        pprint(response, indent=4)
        return (response.response, )

```
