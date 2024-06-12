---
tags:
- CLIP
- CLIPConditioning
- Conditioning
---

# CLIPTextEncodeWithWeight (Inspire)
## Documentation
- Class name: `CLIPTextEncodeWithWeight __Inspire`
- Category: `InspirePack/Util`
- Output node: `False`

The CLIPTextEncodeWithWeight node is designed to encode text inputs using a CLIP model, applying specified strength and additional weight adjustments to the encoding process. This node allows for the customization of text encoding, enabling more nuanced control over the generated embeddings by adjusting their intensity and bias.
## Input types
### Required
- **`text`**
    - The text input to be encoded. It serves as the primary content for the encoding process, influencing the generated embeddings.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`clip`**
    - The CLIP model used for encoding the text. It determines the method and quality of the encoding, impacting the final embeddings.
    - Comfy dtype: `CLIP`
    - Python dtype: `object`
- **`strength`**
    - A multiplier for the encoding strength. It adjusts the intensity of the text's representation in the embedding space.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`add_weight`**
    - An additional weight applied to the encoding. It allows for fine-tuning the bias of the embeddings, offering a way to subtly alter their characteristics.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - The output is a conditioning object containing the encoded text along with any specified adjustments. It's ready for use in further processing or generation tasks.
    - Python dtype: `list`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class CLIPTextEncodeWithWeight:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "text": ("STRING", {"multiline": True}), "clip": ("CLIP", ),
                "strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01}),
                "add_weight": ("FLOAT", {"default": 0.0, "min": -10.0, "max": 10.0, "step": 0.01}),
                }
            }
    RETURN_TYPES = ("CONDITIONING",)
    FUNCTION = "encode"

    CATEGORY = "InspirePack/Util"

    def encode(self, clip, text, strength, add_weight):
        tokens = clip.tokenize(text)

        if add_weight != 0 or strength != 1:
            for v in tokens.values():
                for vv in v:
                    for i in range(0, len(vv)):
                        vv[i] = (vv[i][0], vv[i][1] * strength + add_weight)

        cond, pooled = clip.encode_from_tokens(tokens, return_pooled=True)
        return ([[cond, {"pooled_output": pooled}]], )

```
