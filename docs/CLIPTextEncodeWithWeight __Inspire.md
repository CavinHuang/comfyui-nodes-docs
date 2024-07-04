
# Documentation
- Class name: CLIPTextEncodeWithWeight __Inspire
- Category: InspirePack/Util
- Output node: False

CLIPTextEncodeWithWeight节点旨在使用CLIP模型对文本输入进行编码，同时在编码过程中应用指定的强度和额外的权重调整。该节点允许自定义文本编码，通过调整编码的强度和偏差，实现对生成的嵌入向量更细致的控制。

# Input types
## Required
- text
    - 待编码的文本输入。作为编码过程的主要内容，直接影响生成的嵌入向量。
    - Comfy dtype: STRING
    - Python dtype: str
- clip
    - 用于编码文本的CLIP模型。决定了编码的方法和质量，影响最终的嵌入向量。
    - Comfy dtype: CLIP
    - Python dtype: object
- strength
    - 编码强度的乘数。用于调整文本在嵌入空间中表示的强度。
    - Comfy dtype: FLOAT
    - Python dtype: float
- add_weight
    - 应用于编码的额外权重。允许对嵌入向量的偏差进行微调，提供了一种微妙改变其特征的方法。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- conditioning
    - 输出是一个包含编码后文本及任何指定调整的条件对象。可直接用于后续的处理或生成任务。
    - Comfy dtype: CONDITIONING
    - Python dtype: list


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
