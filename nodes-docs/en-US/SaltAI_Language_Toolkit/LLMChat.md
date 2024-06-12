# ∞ Multi Query
## Documentation
- Class name: `LLMChat`
- Category: `SALT/Language Toolkit/Querying`
- Output node: `False`

The LLMChat node facilitates interactive conversations with a language model by processing user inputs and generating responses. It leverages document embedding, message templating, and query engines to simulate a chat environment, allowing for dynamic and context-aware dialogues.
## Input types
### Required
- **`llm_model`**
    - A dictionary specifying the language model and its embedding model used for generating responses and processing documents.
    - Comfy dtype: `LLM_MODEL`
    - Python dtype: `Dict[str, Any]`
- **`prompt`**
    - The user's input or question to the language model, serving as the basis for generating a response.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`llm_context`**
    - Optional context information for the language model, used to tailor responses more closely to the given scenario.
    - Comfy dtype: `LLM_CONTEXT`
    - Python dtype: `Any`
- **`llm_message`**
    - A list of chat messages that provide context or history for the conversation, enhancing the relevance of the model's response.
    - Comfy dtype: `LIST`
    - Python dtype: `List[ChatMessage]`
- **`llm_documents`**
    - Optional documents provided to enrich the conversation context or serve as reference material for the language model.
    - Comfy dtype: `DOCUMENT`
    - Python dtype: `List[Any]`
## Output types
- **`response`**
    - Comfy dtype: `STRING`
    - The generated response from the language model to the user's prompt.
    - Python dtype: `str`
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
