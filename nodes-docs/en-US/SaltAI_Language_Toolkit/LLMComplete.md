# ∞ Complete Query
## Documentation
- Class name: `LLMComplete`
- Category: `SALT/Language Toolkit/Querying`
- Output node: `False`

The LLMComplete node is designed to generate text completions based on a given prompt using a specified language model. It abstracts the complexity of querying language models, allowing for straightforward integration into larger systems that require natural language processing capabilities.
## Input types
### Required
- **`llm_model`**
    - Specifies the language model to be used for generating text completions. This parameter is crucial as it determines the linguistic and knowledge capabilities of the generated text.
    - Comfy dtype: `LLM_MODEL`
    - Python dtype: `Dict[str, Any]`
- **`prompt`**
    - The input text prompt based on which the language model generates completions. This parameter is essential for guiding the model's output towards the desired context or question.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
## Output types
- **`completion`**
    - Comfy dtype: `STRING`
    - The generated text completion based on the input prompt and the specified language model.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class LLMComplete:
    def __init__(self):
        pass
    
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "llm_model": ("LLM_MODEL", ),
                "prompt": ("STRING", {"multiline": True, "dynamicPrompts": False, "placeholder": "The circumference of the Earth is"}),
            },
            "optional": {
                #"image_documents": ("DOCUMENT",)
            }
        }

    RETURN_TYPES = ("STRING", )
    RETURN_NAMES = ("completion", )

    FUNCTION = "complete"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Querying"

    def complete(self, llm_model:Dict[str, Any], prompt:str, documents:List[Any] = None) -> str:
        if not documents:
            response = llm_model['llm'].complete(prompt)
        else:
            documents_images = [doc for doc in documents if isinstance(doc, ImageDocument)]
            response = llm_model['llm'].complete(prompt, image_documents=documents_images)
        pprint(response, indent=4)
        return (response.text, )

```
