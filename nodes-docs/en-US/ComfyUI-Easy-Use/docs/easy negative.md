# Negative
## Documentation
- Class name: `easy negative`
- Category: `EasyUse/Prompt`
- Output node: `False`

The 'easy negative' node is designed to process negative conditioning inputs for generative models, focusing on embedding and normalizing these inputs for enhanced model performance. It encapsulates the complexity of handling negative prompts, including tokenization, embedding, and optional adjustments based on specific normalization and weighting strategies, to optimize the generation process towards avoiding certain traits or characteristics.
## Input types
### Required
- **`negative`**
    - The 'negative' input represents the textual content that the model should avoid generating. It is crucial for guiding the model to negate certain aspects or themes in the output, affecting the overall direction and quality of the generated content.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`negative`**
    - Comfy dtype: `STRING`
    - unknown
    - Python dtype: `unknown`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class negativePrompt:

    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "negative": ("STRING", {"default": "", "multiline": True, "placeholder": "Negative"}),}
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("negative",)
    FUNCTION = "main"

    CATEGORY = "EasyUse/Prompt"

    @staticmethod
    def main(negative):
        return negative,

```
