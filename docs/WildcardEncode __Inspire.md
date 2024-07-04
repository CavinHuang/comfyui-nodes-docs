
# Documentation
- Class name: WildcardEncode __Inspire
- Category: InspirePack/Prompt
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

WildcardEncode __Inspire节点旨在通过复杂的编码技术来处理和增强文本提示，利用外部模型或自定义算法。它专注于通过应用高级文本处理策略来提升生成内容的质量和特异性。

# Input types
## Required
- model
    - 指定用于编码的模型。这是一个关键组件，决定了编码过程的有效性。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- clip
    - 指与主要模型一起使用的CLIP模型，用于增强编码过程。它在解释和处理文本方面起着至关重要的作用。
    - Comfy dtype: CLIP
    - Python dtype: torch.nn.Module
- token_normalization
    - 定义标记规范化的方法，影响文本输入的处理和编码方式。它影响编码对不同文本长度和复杂度的适应性。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- weight_interpretation
    - 决定在编码过程中如何解释权重，影响最终编码输出的质量和相关性。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- wildcard_text
    - 将被编码的文本输入。这个参数是节点操作的核心，直接影响输出。
    - Comfy dtype: STRING
    - Python dtype: str
- populated_text
    - 填充通配符文本的结果，基于编码过程自动生成。它反映了输入文本的增强版本。
    - Comfy dtype: STRING
    - Python dtype: str
- mode
    - 控制文本是动态填充还是固定，影响通配符文本的处理和编码方式。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- Select to add LoRA
    - 允许选择要添加到文本中的LoRA，用特定特征或效果增强编码。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- Select to add Wildcard
    - 允许向文本添加预定义的通配符，进一步自定义编码过程。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- seed
    - 编码中随机过程的种子值，确保输出的可重复性和一致性。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- model
    - 经过处理和可能被编码修改后的模型。
    - Comfy dtype: MODEL
    - Python dtype: torch.nn.Module
- clip
    - 经过处理和可能被编码修改后的CLIP模型。
    - Comfy dtype: CLIP
    - Python dtype: torch.nn.Module
- conditioning
    - 编码过程生成的条件信息，用于指导生成。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- populated_text
    - 编码后的最终填充文本，代表增强和精炼后的输出。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WildcardEncodeInspire:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                        "model": ("MODEL",),
                        "clip": ("CLIP",),
                        "token_normalization": (["none", "mean", "length", "length+mean"], ),
                        "weight_interpretation": (["comfy", "A1111", "compel", "comfy++", "down_weight"], {'default': 'comfy++'}),
                        "wildcard_text": ("STRING", {"multiline": True, "dynamicPrompts": False, 'placeholder': 'Wildcard Prompt (User Input)'}),
                        "populated_text": ("STRING", {"multiline": True, "dynamicPrompts": False, 'placeholder': 'Populated Prompt (Will be generated automatically)'}),
                        "mode": ("BOOLEAN", {"default": True, "label_on": "Populate", "label_off": "Fixed"}),
                        "Select to add LoRA": (["Select the LoRA to add to the text"] + folder_paths.get_filename_list("loras"), ),
                        "Select to add Wildcard": (["Select the Wildcard to add to the text"],),
                        "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                    },
                }

    CATEGORY = "InspirePack/Prompt"

    RETURN_TYPES = ("MODEL", "CLIP", "CONDITIONING", "STRING")
    RETURN_NAMES = ("model", "clip", "conditioning", "populated_text")
    FUNCTION = "doit"

    def doit(self, *args, **kwargs):
        populated = kwargs['populated_text']

        clip_encoder = BNK_EncoderWrapper(kwargs['token_normalization'], kwargs['weight_interpretation'])

        if 'ImpactWildcardEncode' not in nodes.NODE_CLASS_MAPPINGS:
            utils.try_install_custom_node('https://github.com/ltdrdata/ComfyUI-Impact-Pack',
                                          "To use 'Wildcard Encode (Inspire)' node, 'Impact Pack' extension is required.")
            raise Exception(f"[ERROR] To use 'Wildcard Encode (Inspire)', you need to install 'Impact Pack'")

        model, clip, conditioning = nodes.NODE_CLASS_MAPPINGS['ImpactWildcardEncode'].process_with_loras(wildcard_opt=populated, model=kwargs['model'], clip=kwargs['clip'], clip_encoder=clip_encoder)
        return (model, clip, conditioning, populated)

```
