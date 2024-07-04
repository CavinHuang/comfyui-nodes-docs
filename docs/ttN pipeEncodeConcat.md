
# Documentation
- Class name: ttN pipeEncodeConcat
- Category: ttN/pipe
- Output node: True
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

ttN pipeEncodeConcat节点旨在增强和连接管道内的条件信息，利用高级编码技术来优化和合并文本条件输入，从而提供更好的模型指导。该节点在处理和整合各种条件输入方面发挥关键作用，为生成过程提供更精细和有针对性的控制。

# Input types
## Required
- pipe
    - 代表管道状态，包括模型、条件设置和其他相关参数，作为编码和连接过程的基础。
    - Comfy dtype: PIPE_LINE
    - Python dtype: dict
- toggle
    - 一个布尔标志，用于决定是否执行编码和连接过程。
    - Comfy dtype: COMBO[BOOLEAN]
    - Python dtype: bool

## Optional
- positive
    - 可选的正向文本输入，用于条件设置，旨在引导模型生成与指定属性一致的内容。
    - Comfy dtype: STRING
    - Python dtype: str
- positive_token_normalization
    - 指定正向条件中标记归一化的方法，影响模型对这些标记的解释和权重分配。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- positive_weight_interpretation
    - 定义正向条件中权重的解释方式，影响模型的生成过程。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- negative
    - 可选的负向文本输入，用于条件设置，引导模型避免生成具有指定属性的内容。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_token_normalization
    - 指定负向条件中标记归一化的方法，影响模型对这些标记的解释和权重分配。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- negative_weight_interpretation
    - 定义负向条件中权重的解释方式，与正向条件相对，影响模型的生成过程。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- optional_positive_from
    - 可选的高级正向条件输入，允许更细致和具体的模型指导。
    - Comfy dtype: CONDITIONING
    - Python dtype: list of tuples
- optional_negative_from
    - 可选的高级负向条件输入，实现更详细和有针对性的模型影响。
    - Comfy dtype: CONDITIONING
    - Python dtype: list of tuples
- optional_clip
    - 可选的CLIP模型参数，可用于通过视觉指导进一步优化条件设置过程。
    - Comfy dtype: CLIP
    - Python dtype: object

# Output types
- pipe
    - 更新后的管道状态，包含新编码和连接的条件信息。
    - Comfy dtype: PIPE_LINE
    - Python dtype: dict
- positive
    - 增强和连接后的正向条件输出，准备用于指导模型的生成。
    - Comfy dtype: CONDITIONING
    - Python dtype: list of tuples
- negative
    - 增强和连接后的负向条件输出，为模型提供与正向条件相对的精细指导。
    - Comfy dtype: CONDITIONING
    - Python dtype: list of tuples
- clip
    - CLIP模型参数，可能在编码和连接过程中更新，用于进一步优化视觉指导。
    - Comfy dtype: CLIP
    - Python dtype: object
- ui
    - 显示生成文本的UI组件，提供对编码和连接过程的洞察。


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ttN_pipeEncodeConcat:
    version = '1.0.2'
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                    "pipe": ("PIPE_LINE",),
                    "toggle": ([True, False],),
                    },
                "optional": {
                    "positive": ("STRING", {"default": "Positive","multiline": True}),
                    "positive_token_normalization": (["none", "mean", "length", "length+mean"],),
                    "positive_weight_interpretation": (["comfy", "A1111", "compel", "comfy++", "down_weight"],),
                    "negative": ("STRING", {"default": "Negative","multiline": True}),
                    "negative_token_normalization": (["none", "mean", "length", "length+mean"],),
                    "negative_weight_interpretation": (["comfy", "A1111", "compel", "comfy++", "down_weight"],),
                    "optional_positive_from": ("CONDITIONING",),
                    "optional_negative_from": ("CONDITIONING",),
                    "optional_clip": ("CLIP",),
                    },
                "hidden": {
                    "ttNnodeVersion": ttN_pipeEncodeConcat.version, "my_unique_id": "UNIQUE_ID"
                    },
        }
    
    OUTPUT_NODE = True
    RETURN_TYPES = ("PIPE_LINE", "CONDITIONING", "CONDITIONING", "CLIP")
    RETURN_NAMES = ("pipe", "positive", "negative", "clip")
    FUNCTION = "concat"

    CATEGORY = "ttN/pipe"

    def concat(self, toggle, positive_token_normalization, positive_weight_interpretation,
               negative_token_normalization, negative_weight_interpretation,
                 pipe=None, positive='', negative='', seed=None, my_unique_id=None, optional_positive_from=None, optional_negative_from=None, optional_clip=None):
        
        if toggle == False:
            return (pipe, pipe["positive"], pipe["negative"], pipe["clip"])
        
        positive_from = optional_positive_from if optional_positive_from is not None else pipe["positive"] 
        negative_from = optional_negative_from if optional_negative_from is not None else pipe["negative"]
        samp_clip = optional_clip if optional_clip is not None else pipe["clip"]

        new_text = ''

        def enConcatConditioning(text, token_normalization, weight_interpretation, conditioning_from, new_text):
            out = []
            if "__" in text:
                text = loader.nsp_parse(text, pipe["seed"], title="encodeConcat", my_unique_id=my_unique_id)
                new_text += text

            conditioning_to, pooled = advanced_encode(samp_clip, text, token_normalization, weight_interpretation, w_max=1.0, apply_to_pooled='enable')
            conditioning_to = [[conditioning_to, {"pooled_output": pooled}]]

            if len(conditioning_from) > 1:
                ttNl.warn("encode and concat conditioning_from contains more than 1 cond, only the first one will actually be applied to conditioning_to")

            cond_from = conditioning_from[0][0]

            for i in range(len(conditioning_to)):
                t1 = conditioning_to[i][0]
                tw = torch.cat((t1, cond_from),1)
                n = [tw, conditioning_to[i][1].copy()]
                out.append(n)

            return out

        pos, neg = None, None
        if positive not in ['', None, ' ']:
            pos = enConcatConditioning(positive, positive_token_normalization, positive_weight_interpretation, positive_from, new_text)
        if negative not in ['', None, ' ']:
            neg = enConcatConditioning(negative, negative_token_normalization, negative_weight_interpretation, negative_from, new_text)

        pos = pos if pos is not None else pipe["positive"]
        neg = neg if neg is not None else pipe["negative"]
        
        new_pipe = {
                "model": pipe["model"],
                "positive": pos,
                "negative": neg,
                "vae": pipe["vae"],
                "clip": samp_clip,

                "samples": pipe["samples"],
                "images": pipe["images"],
                "seed": pipe["seed"],

                "loader_settings": pipe["loader_settings"],
            }
        del pipe

        return (new_pipe, new_pipe["positive"], new_pipe["negative"], samp_clip, { "ui": { "string": new_text } } )

```
