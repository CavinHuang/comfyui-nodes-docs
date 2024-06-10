---
tags:
- LoRA
---

# ELLA Text Encode (Prompt)
## Documentation
- Class name: `ELLATextEncode`
- Category: `ella/conditioning`
- Output node: `False`

The ELLATextEncode node is designed for encoding text inputs using the ELLA model, incorporating an additional layer of processing through a T5 text embedder. This node aims to generate conditioned embeddings suitable for further processing or generation tasks, leveraging the capabilities of both ELLA and T5 models to enhance the text encoding process.
## Input types
### Required
- **`text`**
    - The 'text' input is the primary textual data for encoding. It plays a crucial role in determining the output embeddings by serving as the direct input for the T5 text embedder, which is then processed by the ELLA model.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`sigma`**
    - The 'sigma' parameter specifies the timesteps for the ELLA model, affecting the temporal aspect of the encoding process. It influences how the ELLA model interprets the conditioning over time, thereby impacting the final embeddings.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`ella`**
    - The 'ella' input provides the necessary ELLA model components, including the ELLA model itself and the T5 text embedder, for the text encoding process. It is essential for enabling the node to perform its encoding function.
    - Comfy dtype: `ELLA`
    - Python dtype: `dict`
## Output types
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - The output is a conditioned embedding, tailored for further generative tasks. It includes the embeddings from the ELLA model, enriched with additional information such as pooled output, designed to enhance downstream processing.
    - Python dtype: `list`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class ELLATextEncode:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "text": ("STRING", {"multiline": True}), 
                "sigma": ("FLOAT", {"default": 1}, ),
                "ella": ("ELLA", ),
            }
        }

    RETURN_TYPES = ("CONDITIONING",)
    FUNCTION = "encode"

    CATEGORY = "ella/conditioning"

    def encode(self, text, ella: dict, sigma):
        ella_dict = ella

        ella: ELLA = ella_dict.get("ELLA")
        t5: T5TextEmbedder = ella_dict.get("T5")

        cond = t5(text)
        cond_ella = ella(cond, timesteps=torch.from_numpy(sigma))
        
        return ([[cond_ella, {"pooled_output": cond_ella}]], ) # Output twice as we don't use pooled output

```
