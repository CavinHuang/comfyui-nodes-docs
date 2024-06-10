---
tags:
- CLIP
- CLIPConditioning
- Conditioning
---

# CLIP Text Encode Sequence (Advanced)
## Documentation
- Class name: `CLIPTextEncodeList`
- Category: `conditioning`
- Output node: `False`

This node is designed for encoding textual inputs using a CLIP model, transforming them into a structured format that can be utilized for further computational tasks or analyses. It focuses on processing multiple text inputs, applying tokenization and encoding to extract relevant features for downstream applications.
## Input types
### Required
- **`clip`**
    - The 'clip' parameter represents the CLIP model used for text encoding. It is crucial for the node's operation as it determines how text inputs are processed and encoded.
    - Comfy dtype: `CLIP`
    - Python dtype: `torch.nn.Module`
- **`token_normalization`**
    - Specifies the method for normalizing tokens, affecting the encoding process's outcome. It plays a significant role in adjusting the encoding based on the chosen normalization strategy.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`weight_interpretation`**
    - Defines how weights are interpreted during the encoding process, influencing the final encoded output. It's important for tailoring the encoding to specific weight interpretation preferences.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`text`**
    - The textual input to be encoded. This parameter is essential as it provides the raw data for the encoding process.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`conditioning_sequence`**
    - Comfy dtype: `CONDITIONING_SEQ`
    - The output is a sequence of conditionings derived from the encoded text inputs. It's significant for subsequent computational tasks that rely on these encoded representations.
    - Python dtype: `List[torch.Tensor]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CLIPTextEncodeSequence:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "clip": ("CLIP", ),
                "token_normalization": (["none", "mean", "length", "length+mean"],),
                "weight_interpretation": (["comfy", "A1111", "compel", "comfy++"],),
                "text": ("STRING", {"multiline": True, "default": '''0:A portrait of a rosebud
5:A portrait of a blooming rosebud
10:A portrait of a blooming rose
15:A portrait of a rose'''}),
                }
            }
        
    RETURN_TYPES = ("CONDITIONING_SEQ",)
    RETURN_NAMES = ("conditioning_sequence",)
    IS_LIST_OUTPUT = (True,)

    FUNCTION = "encode"
    CATEGORY = "conditioning"

    def encode(self, clip, text, token_normalization, weight_interpretation):
        text = text.strip()
        conditionings = []
        for l in text.splitlines():
            match = re.match(r'(\d+):', l)
            
            if match:
                idx = int(match.group(1))
                _, line = l.split(":", 1)
                line = line.strip()
                
                if USE_BLK:
                    encoded = blk_adv.encode(clip=clip, text=line, token_normalization=token_normalization, weight_interpretation=weight_interpretation)
                else:
                    encoded = CLIPTextEncode.encode(clip=clip, text=line)
                
                conditioning = (idx, [encoded[0][0][0], encoded[0][0][1]])
                conditionings.append(conditioning)

        return (conditionings, )

```
