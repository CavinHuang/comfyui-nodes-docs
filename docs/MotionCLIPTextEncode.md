
# Documentation
- Class name: MotionCLIPTextEncode
- Category: MotionDiff
- Output node: False

MotionCLIPTextEncode节点旨在将文本描述编码成适用于动作生成任务的格式。它利用CLIP模型和动作数据来生成动作条件，从而促进创建与给定文本描述相匹配的动作序列。

# Input types
## Required
- md_clip
    - md_clip参数代表一个针对动作数据定制的CLIP模型，对于在动作语境中解释和编码文本描述至关重要。
    - Comfy dtype: MD_CLIP
    - Python dtype: MD_CLIP
- motion_data
    - motion_data参数包含编码过程所需的动作信息，为文本解释提供必要的上下文。
    - Comfy dtype: MOTION_DATA
    - Python dtype: MOTION_DATA
- text
    - text参数是待编码的文本描述，作为生成与动作相匹配序列的输入。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- md_conditioning
    - 输出是动作条件数据，用于指导生成与输入文本相对应的动作序列。
    - Comfy dtype: MD_CONDITIONING
    - Python dtype: MD_CONDITIONING


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MotionCLIPTextEncode:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "md_clip": ("MD_CLIP", ),
                "motion_data": ("MOTION_DATA", ),
                "text": ("STRING", {"default": "a person performs a cartwheel" ,"multiline": True})
            },
        }

    RETURN_TYPES = ("MD_CONDITIONING",)
    CATEGORY = "MotionDiff"
    FUNCTION = "encode_text"

    def encode_text(self, md_clip, motion_data, text):
        return (md_clip(text, motion_data), )

```
