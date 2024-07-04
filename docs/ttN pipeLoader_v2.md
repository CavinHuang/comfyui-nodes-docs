
# Documentation
- Class name: ttN pipeLoader_v2
- Category: ttN/pipe
- Output node: False
- Repo Ref: https://github.com/ttN/ComfyUI-ttN-nodes

此节点用于在tinyterraNodes框架内加载和初始化各种任务的管道，为数据处理和模型交互管道的设置和配置提供便利。

# Input types
## Required
- ckpt_name
    - 指定用于模型初始化的检查点名称，允许选择不同的模型状态。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: list
- config_name
    - 确定配置名称，支持从各种预定义设置中进行选择。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: list
- vae_name
    - 指定VAE模型名称，允许选择不同的VAE模型进行处理。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: list
- clip_skip
    - 用于跳过某些CLIP模型层的整数值，根据特定需求优化性能。
    - Comfy dtype: INT
    - Python dtype: int
- loras
    - 指定LoRA参数的字符串，支持动态调整LoRA层以优化模型。
    - Comfy dtype: STRING
    - Python dtype: str
- positive
    - 未知
    - Comfy dtype: STRING
    - Python dtype: unknown
- positive_token_normalization
    - 未知
    - Comfy dtype: COMBO[STRING]
    - Python dtype: unknown
- positive_weight_interpretation
    - 未知
    - Comfy dtype: COMBO[STRING]
    - Python dtype: unknown
- negative
    - 未知
    - Comfy dtype: STRING
    - Python dtype: unknown
- negative_token_normalization
    - 未知
    - Comfy dtype: COMBO[STRING]
    - Python dtype: unknown
- negative_weight_interpretation
    - 未知
    - Comfy dtype: COMBO[STRING]
    - Python dtype: unknown
- empty_latent_aspect
    - 定义空白潜在空间初始化的宽高比，为图像生成奠定基础。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- empty_latent_width
    - 指定空白潜在空间的宽度，确定图像生成的初始尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- empty_latent_height
    - 指定空白潜在空间的高度，确定图像生成的初始尺寸。
    - Comfy dtype: INT
    - Python dtype: int
- seed
    - 用于随机数生成的整数种子，确保管道执行的可重复性。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- model_override
    - 允许覆盖默认模型，支持在管道中使用替代模型。
    - Comfy dtype: MODEL
    - Python dtype: str
- clip_override
    - 允许覆盖默认CLIP模型，集成替代的视觉理解能力。
    - Comfy dtype: CLIP
    - Python dtype: str
- optional_lora_stack
    - 可选参数，用于指定LoRA调整堆栈，通过自定义配置增强模型性能。
    - Comfy dtype: LORA_STACK
    - Python dtype: str
- optional_controlnet_stack
    - 可选参数，用于指定ControlNet调整堆栈，实现对模型行为的精细控制。
    - Comfy dtype: CONTROLNET_STACK
    - Python dtype: str
- prepend_positive
    - 可选文本，用于预置到正面条件前，丰富所需属性的上下文。
    - Comfy dtype: STRING
    - Python dtype: str
- prepend_negative
    - 可选文本，用于预置到负面条件前，完善不需要的属性的上下文。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- pipe
    - 处理输入后更新的管道配置。
    - Comfy dtype: PIPE_LINE
    - Python dtype: dict
- model
    - 未知
    - Comfy dtype: MODEL
    - Python dtype: unknown
- positive
    - 处理后的正面条件，准备在管道中使用。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- negative
    - 处理后的负面条件，准备在管道中使用。
    - Comfy dtype: CONDITIONING
    - Python dtype: str
- latent
    - 未知
    - Comfy dtype: LATENT
    - Python dtype: unknown
- vae
    - 未知
    - Comfy dtype: VAE
    - Python dtype: unknown
- clip
    - 根据可选输入集成的CLIP模型参数。
    - Comfy dtype: CLIP
    - Python dtype: str
- seed
    - 未知
    - Comfy dtype: INT
    - Python dtype: unknown
- width
    - 未知
    - Comfy dtype: INT
    - Python dtype: unknown
- height
    - 未知
    - Comfy dtype: INT
    - Python dtype: unknown
- pos_string
    - 未知
    - Comfy dtype: STRING
    - Python dtype: unknown
- neg_string
    - 未知
    - Comfy dtype: STRING
    - Python dtype: unknown
- ui
    - 节点生成的用户界面组件，提供交互式或信息性元素。


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ttN_pipeLoader_v2:
    version = '2.0.0'
    @classmethod
    def INPUT_TYPES(cls):
        aspect_ratios = ["width x height [custom]",
                        "512 x 512 [S] 1:1",
                        "768 x 768 [S] 1:1",
                        "910 x 910 [S] 1:1",

                        "512 x 682 [P] 3:4",
                        "512 x 768 [P] 2:3",
                        "512 x 910 [P] 9:16",

                        "682 x 512 [L] 4:3",
                        "768 x 512 [L] 3:2",
                        "910 x 512 [L] 16:9",
                        
                        "512 x 1024 [P] 1:2",
                        "1024 x 512 [L] 2:1",
                        ]

        return {"required": { 
                        "ckpt_name": (folder_paths.get_filename_list("checkpoints"), ),
                        "config_name": (["Default",] + folder_paths.get_filename_list("configs"), {"default": "Default"} ),
                        "vae_name": (["Baked VAE"] + folder_paths.get_filename_list("vae"),),
                        "clip_skip": ("INT", {"default": -1, "min": -24, "max": 0, "step": 1}),

                        "loras": ("STRING", {"placeholder": "<lora:loraName:weight:optClipWeight>", "multiline": True}),

                        "positive": ("STRING", {"default": "Positive","multiline": True, "dynamicPrompts": True}),
                        "positive_token_normalization": (["none", "mean", "length", "length+mean"],),
                        "positive_weight_interpretation": (["comfy", "A1111", "compel", "comfy++", "down_weight"],),

                        "negative": ("STRING", {"default": "Negative", "multiline": True, "dynamicPrompts": True}),
                        "negative_token_normalization": (["none", "mean", "length", "length+mean"],),
                        "negative_weight_interpretation": (["comfy", "A1111", "compel", "comfy++", "down_weight"],),

                        "empty_latent_aspect": (aspect_ratios, {"default":"512 x 512 [S] 1:1"}),
                        "empty_latent_width": ("INT", {"default": 512, "min": 64, "max": MAX_RESOLUTION, "step": 8}),
                        "empty_latent_height": ("INT", {"default": 512, "min": 64, "max": MAX_RESOLUTION, "step": 8}),
                        "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                        },                
                "optional": {
                    "model_override": ("MODEL",), 
                    "clip_override": ("CLIP",), 
                    "optional_lora_stack": ("LORA_STACK",),
                    "optional_controlnet_stack": ("CONTROLNET_STACK",),
                    "prepend_positive": ("STRING", {"default": None, "forceInput": True}),
                    "prepend_negative": ("STRING", {"default": None, "forceInput": True}),
                    },
                "hidden": {"prompt": "PROMPT", "ttNnodeVersion": ttN_pipeLoader_v2.version}, "my_unique_id": "UNIQUE_ID",}

    RETURN_TYPES = ("PIPE_LINE" ,"MODEL", "CONDITIONING", "CONDITIONING", "LATENT", "VAE", "CLIP", "INT", "INT", "INT", "STRING", "STRING")
    RETURN_NAMES = ("pipe","model", "positive", "negative", "latent", "vae", "clip", "seed", "width", "height", "pos_string", "neg_string")

    FUNCTION = "adv_pipeloader"
    CATEGORY = "ttN/pipe"

    def adv_pipeloader(self, ckpt_name, config_name, vae_name, clip_skip,
                       loras,
                       positive, positive_token_normalization, positive_weight_interpretation, 
                       negative, negative_token_normalization, negative_weight_interpretation, 
                       empty_latent_aspect, empty_latent_width, empty_latent_height, seed,
                       model_override=None, clip_override=None, optional_lora_stack=None, optional_controlnet_stack=None, prepend_positive=None, prepend_negative=None,
                       prompt=None, my_unique_id=None):

        model: ModelPatcher | None = None
        clip: CLIP | None = None
        vae: VAE | None = None

        # Create Empty Latent
        latent = sampler.emptyLatent(empty_latent_aspect, 1, empty_latent_width, empty_latent_height)
        samples = {"samples":latent}

        # Clean models from loaded_objects
        loader.update_loaded_objects(prompt)

        model, clip, vae = loader.load_main3(ckpt_name, config_name, vae_name, loras, model_override, clip_override, optional_lora_stack)

        positive_embedding = loader.embedding_encode(positive, positive_token_normalization, positive_weight_interpretation, clip, clip_skip, seed=seed, title='pipeLoader Positive', my_unique_id=my_unique_id, prepend_text=prepend_positive)
        negative_embedding = loader.embedding_encode(negative, negative_token_normalization, negative_weight_interpretation, clip, clip_skip, seed=seed, title='pipeLoader Negative', my_unique_id=my_unique_id, prepend_text=prepend_negative)

        if optional_controlnet_stack is not None:
            for cnt in optional_controlnet_stack:
                positive_embedding, negative_embedding = loader.load_controlNet(self, positive_embedding, negative_embedding, cnt[0], cnt[1], cnt[2], cnt[3], cnt[4])

        image = None

        pipe = {"model": model,
                "positive": positive_embedding,
                "negative": negative_embedding,
                "vae": vae,
                "clip": clip,

                "samples": samples,
                "images": image,
                "seed": seed,

                "loader_settings": {"ckpt_name": ckpt_name,
                                    "vae_name": vae_name,

                                    "loras": loras,

                                    "model_override": model_override,
                                    "clip_override": clip_override,
                                    "optional_lora_stack": optional_lora_stack,
                                    "optional_controlnet_stack": optional_controlnet_stack,
                                    "prepend_positive": prepend_positive,
                                    "prepend_negative": prepend_negative,

                                    "refiner_ckpt_name": None,
                                    "refiner_vae_name": None,
                                    "refiner_lora1_name": None,
                                    "refiner_lora1_model_strength": None,
                                    "refiner_lora1_clip_strength": None,
                                    "refiner_lora2_name": None,
                                    "refiner_lora2_model_strength": None,
                                    "refiner_lora2_clip_strength": None,
                                    
                                    "clip_skip": clip_skip,
                                    "positive": positive,
                                    "positive_l": None,
                                    "positive_g": None,
                                    "positive_token_normalization": positive_token_normalization,
                                    "positive_weight_interpretation": positive_weight_interpretation,
                                    "positive_balance": None,
                                    "negative": negative,
                                    "negative_l": None,
                                    "negative_g": None,
                                    "negative_token_normalization": negative_token_normalization,
                                    "negative_weight_interpretation": negative_weight_interpretation,
                                    "negative_balance": None,
                                    "empty_latent_width": empty_latent_width,
                                    "empty_latent_height": empty_latent_height,
                                    "seed": seed,
                                    "empty_samples": samples,}
        }

        final_positive = (prepend_positive + ' ' if prepend_positive else '') + (positive + ' ' if positive else '')
        final_negative = (prepend_negative + ' ' if prepend_negative else '') + (negative + ' ' if negative else '')

        return (pipe, model, positive_embedding, negative_embedding, samples, vae, clip, seed, empty_latent_width, empty_latent_height, final_positive, final_negative)

```
