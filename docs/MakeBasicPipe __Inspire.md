
# Documentation
- Class name: MakeBasicPipe __Inspire
- Category: InspirePack/Prompt
- Output node: False

MakeBasicPipe __Inspire 节点旨在构建一个用于创意内容生成的基础管道，集成了诸如模型、编码器和自定义处理逻辑等各种组件。它促进了文本输入与模型驱动转换的无缝结合，通过专门的编码和适应技术来增强创意输出。

# Input types
## Required
- ckpt_name
    - 要加载的模型检查点名称，定义了内容生成的起点。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- ckpt_key_opt
    - 用于指定检查点内特定配置或变体的可选键，允许进行更定制化的内容生成。
    - Comfy dtype: STRING
    - Python dtype: str
- positive_wildcard_text
    - 用于正面提示的文本输入，旨在引导内容生成朝向特定主题或概念。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_wildcard_text
    - 用于负面提示的文本输入，旨在引导内容生成远离某些主题或概念。
    - Comfy dtype: STRING
    - Python dtype: str
- Add selection to
    - 决定选择是添加到正面还是负面提示中，影响内容生成的方向。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- Select to add LoRA
    - 允许选择要添加到文本中的LoRA，通过额外的细化层增强内容生成过程。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- Select to add Wildcard
    - 启用选择要添加到文本中的通配符，将特定变量或元素引入内容生成。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- wildcard_mode
    - 指定通配符文本是动态填充还是固定的，影响提示的生成和使用方式。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- positive_populated_text
    - 指定旨在对内容生成过程产生正面影响的文本输入，影响生成输出的方向和性质。
    - Comfy dtype: STRING
    - Python dtype: str
- negative_populated_text
    - 指定旨在产生负面影响的文本输入，引导内容生成远离某些主题或概念。
    - Comfy dtype: STRING
    - Python dtype: str
- token_normalization
    - 指示在处理过程中是否以及如何对令牌进行规范化，影响编码和后续的模型交互。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- weight_interpretation
    - 决定在编码过程中如何解释权重，影响文本输入的处理方式。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- stop_at_clip_layer
    - 指定应在CLIP模型的哪一层停止处理，影响分析和修改的深度。
    - Comfy dtype: INT
    - Python dtype: int
- seed
    - 用于初始化随机过程的种子值，确保内容生成的可重复性或可变性。
    - Comfy dtype: INT
    - Python dtype: int

## Optional
- vae_opt
    - 用于指定变分自编码器选项的可选参数，实现对内容生成过程的进一步定制。
    - Comfy dtype: VAE
    - Python dtype: str

# Output types
- basic_pipe
    - 构建的基础管道，可用于根据指定的输入和配置生成创意内容。
    - Comfy dtype: BASIC_PIPE
    - Python dtype: tuple
- cache_key
    - 与生成的管道配置相关联的唯一键，便于缓存和检索管道以供将来使用。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MakeBasicPipe:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                        "ckpt_name": (folder_paths.get_filename_list("checkpoints"), ),
                        "ckpt_key_opt": ("STRING", {"multiline": False, "placeholder": "If empty, use 'ckpt_name' as the key." }),

                        "positive_wildcard_text": ("STRING", {"multiline": True, "dynamicPrompts": False, 'placeholder': 'Positive Prompt (User Input)'}),
                        "negative_wildcard_text": ("STRING", {"multiline": True, "dynamicPrompts": False, 'placeholder': 'Negative Prompt (User Input)'}),

                        "Add selection to": ("BOOLEAN", {"default": True, "label_on": "Positive", "label_off": "Negative"}),
                        "Select to add LoRA": (["Select the LoRA to add to the text"] + folder_paths.get_filename_list("loras"),),
                        "Select to add Wildcard": (["Select the Wildcard to add to the text"],),
                        "wildcard_mode": ("BOOLEAN", {"default": True, "label_on": "Populate", "label_off": "Fixed"}),

                        "positive_populated_text": ("STRING", {"multiline": True, "dynamicPrompts": False, 'placeholder': 'Populated Positive Prompt (Will be generated automatically)'}),
                        "negative_populated_text": ("STRING", {"multiline": True, "dynamicPrompts": False, 'placeholder': 'Populated Negative Prompt (Will be generated automatically)'}),

                        "token_normalization": (["none", "mean", "length", "length+mean"],),
                        "weight_interpretation": (["comfy", "A1111", "compel", "comfy++", "down_weight"], {'default': 'comfy++'}),

                        "stop_at_clip_layer": ("INT", {"default": -2, "min": -24, "max": -1, "step": 1}),
            
                        "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                    },
                "optional": {
                        "vae_opt": ("VAE",)
                    },
                }

    CATEGORY = "InspirePack/Prompt"

    RETURN_TYPES = ("BASIC_PIPE", "STRING")
    RETURN_NAMES = ("basic_pipe", "cache_key")
    FUNCTION = "doit"

    def doit(self, **kwargs):
        pos_populated = kwargs['positive_populated_text']
        neg_populated = kwargs['negative_populated_text']

        clip_encoder = BNK_EncoderWrapper(kwargs['token_normalization'], kwargs['weight_interpretation'])

        if 'ImpactWildcardEncode' not in nodes.NODE_CLASS_MAPPINGS:
            utils.try_install_custom_node('https://github.com/ltdrdata/ComfyUI-Impact-Pack',
                                          "To use 'Make Basic Pipe (Inspire)' node, 'Impact Pack' extension is required.")
            raise Exception(f"[ERROR] To use 'Make Basic Pipe (Inspire)', you need to install 'Impact Pack'")

        model, clip, vae, key = CheckpointLoaderSimpleShared().doit(ckpt_name=kwargs['ckpt_name'], key_opt=kwargs['ckpt_key_opt'])
        clip = nodes.CLIPSetLastLayer().set_last_layer(clip, kwargs['stop_at_clip_layer'])[0]
        model, clip, positive = nodes.NODE_CLASS_MAPPINGS['ImpactWildcardEncode'].process_with_loras(wildcard_opt=pos_populated, model=model, clip=clip, clip_encoder=clip_encoder)
        model, clip, negative = nodes.NODE_CLASS_MAPPINGS['ImpactWildcardEncode'].process_with_loras(wildcard_opt=neg_populated, model=model, clip=clip, clip_encoder=clip_encoder)

        if 'vae_opt' in kwargs:
            vae = kwargs['vae_opt']

        basic_pipe = model, clip, vae, positive, negative

        return (basic_pipe, key)

```
