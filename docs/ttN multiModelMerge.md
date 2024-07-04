
# Documentation
- Class name: ttN multiModelMerge
- Category: ttN
- Output node: False

ttN multiModelMerge节点旨在根据指定的配置和插值比率，实现多个模型和/或CLIP模型的合并。它抽象了模型合并中的复杂性，允许灵活地整合和操作模型属性以达到预期效果。

# Input types
## Required
- ckpt_A_name
    - 指定第一个要合并的检查点文件的名称。这对于识别主模型至关重要，主模型的属性将与另一个模型结合。检查点的选择直接影响合并模型的基本特征，进而影响其性能和功能。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- config_A_name
    - 指定与第一个模型相关的配置名称。这在决定如何合并和操作模型属性方面起着关键作用。配置设置定义了模型的操作参数，通过指定如何整合属性来影响合并过程的结果。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- ckpt_B_name
    - 指定第二个要合并的检查点文件的名称。它作为模型属性的次要来源，将被整合到主模型中。这个检查点的选择影响了将添加到合并模型中的额外功能和特性，塑造其最终形态。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- config_B_name
    - 指定与第二个模型相关的配置名称。这对于指导合并过程并确保达到预期结果至关重要。配置详细信息为如何将第二个模型的属性与第一个模型结合提供了蓝图，影响合并模型的功能和性能。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- ckpt_C_name
    - 如果适用，指定第三个检查点文件的名称，用于合并额外的模型属性。包含第三个模型可以引入新的特性或功能，进一步增强合并模型的复杂性和实用性。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- config_C_name
    - 指定第三个模型的配置名称，指导其整合到合并过程中。第三个模型的配置决定了如何合并其属性，可能引入新功能或增强合并模型中的现有功能。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- model_interpolation
    - 确定合并模型属性的插值比率，允许对合并结果进行精细控制。这个比率平衡了每个模型属性在最终合并模型中的影响，使得结果模型的特征可以精确定制。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: float
- model_multiplier
    - 影响第二个模型属性在合并中的强度的乘数。这个参数允许调整第二个模型特征在合并模型中的主导性，实现模型集成的定制方法。
    - Comfy dtype: FLOAT
    - Python dtype: float
- clip_interpolation
    - 指定合并CLIP模型属性的插值比率，实现对其集成的精确控制。这个比率决定了合并输出中CLIP模型特征的平衡，允许对最终CLIP模型的功能进行定制调整。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: float
- clip_multiplier
    - 影响第二个CLIP模型属性在合并中的强度。调整这个乘数可以精细调整第二个CLIP模型的特征如何在合并模型中表现，提供对集成过程的控制。
    - Comfy dtype: FLOAT
    - Python dtype: float
- save_model
    - 一个布尔值，指示是否将合并后的模型保存到磁盘。选择保存模型会影响工作流程，提供一个可用于后续处理或进一步分析的具体输出。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: bool
- save_prefix
    - 保存合并模型时文件名的前缀，提供了组织和识别保存模型的方法。这个参数影响模型管理和检索的便利性，影响合并模型的分类和访问方式。
    - Comfy dtype: STRING
    - Python dtype: str

## Optional
- model_A_override
    - 允许覆盖第一个模型的特定属性，提供合并过程的定制。这种能力使基础模型的特征可以修改，允许创建一个更符合特定要求的定制合并模型。
    - Comfy dtype: MODEL
    - Python dtype: bool
- model_B_override
    - 使得可以覆盖第二个模型的属性，进一步定制合并。这个特性提供了灵活性，可以改变第二个模型对合并模型的贡献，使调整达到预期结果成为可能。
    - Comfy dtype: MODEL
    - Python dtype: bool
- model_C_override
    - 允许覆盖第三个模型（如果存在）的属性，根据特定需求定制合并。这个选项允许定制第三个模型对合并模型的影响，促进更精确的模型属性集成。
    - Comfy dtype: MODEL
    - Python dtype: bool
- clip_A_override
    - 允许覆盖第一个CLIP模型的特定属性，定制集成。这种灵活性使得可以调整第一个CLIP模型对合并CLIP模型的贡献，允许采用定制方法合并CLIP属性。
    - Comfy dtype: CLIP
    - Python dtype: bool
- clip_B_override
    - 使得可以覆盖第二个CLIP模型的属性，允许定制集成。这个选项提供了修改第二个CLIP模型特征如何被合并到模型中的能力，控制最终CLIP模型的特征。
    - Comfy dtype: CLIP
    - Python dtype: bool
- clip_C_override
    - 允许覆盖第三个CLIP模型（如果使用）的属性，进行定制集成。这个特性允许精确调整第三个CLIP模型对合并模型的影响，实现更定制化的CLIP模型合并方法。
    - Comfy dtype: CLIP
    - Python dtype: bool
- optional_vae
    - 指定是否在合并中包含可选的VAE模型，增加了过程的灵活性。包含VAE模型可以引入额外的功能或增强合并模型的性能，提供更多定制选项。
    - Comfy dtype: VAE
    - Python dtype: bool

# Output types
- model
    - Comfy dtype: MODEL
    - 使用给定比率合并指定模型后的结果模型。它体现了两个输入模型的组合特征和能力。
    - Python dtype: comfy.model_base.Model
- clip
    - Comfy dtype: CLIP
    - 合并后的CLIP模型结果（如果适用）。它代表了从输入CLIP模型集成的特征和功能。
    - Python dtype: comfy.model_base.CLIP
- vae
    - Comfy dtype: VAE
    - 合并后的VAE模型结果（如果适用）。它表示输入模型中VAE模型属性的融合。
    - Python dtype: comfy.model_base.VAE


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ttN_multiModelMerge:
    version = '1.0.1'
    def __init__(self):
        pass
    
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                    "ckpt_A_name": (folder_paths.get_filename_list("checkpoints"), ),
                    "config_A_name": (["Default",] + folder_paths.get_filename_list("configs"), {"default": "Default"} ),
                    "ckpt_B_name": (["None",] + folder_paths.get_filename_list("checkpoints"), ),
                    "config_B_name": (["Default",] + folder_paths.get_filename_list("configs"), {"default": "Default"} ),
                    "ckpt_C_name": (["None",] + folder_paths.get_filename_list("checkpoints"), ),
                    "config_C_name": (["Default",] + folder_paths.get_filename_list("configs"), {"default": "Default"} ),

                    "model_interpolation": (MODEL_INTERPOLATIONS,),
                    "model_multiplier": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                    
                    "clip_interpolation": (CLIP_INTERPOLATIONS,),
                    "clip_multiplier": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),

                    "save_model": (["True", "False"],{"default": "False"}),
                    "save_prefix": ("STRING", {"default": "checkpoints/ComfyUI"}),
                },
                "optional": {
                    "model_A_override": ("MODEL",),
                    "model_B_override": ("MODEL",),
                    "model_C_override": ("MODEL",),
                    "clip_A_override": ("CLIP",),
                    "clip_B_override": ("CLIP",),
                    "clip_C_override": ("CLIP",),
                    "optional_vae": ("VAE",),
                },
                "hidden": {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO", "ttNnodeVersion": ttN_multiModelMerge.version, "my_unique_id": "UNIQUE_ID"},
        }
    
    RETURN_TYPES = ("MODEL", "CLIP", "VAE",)
    RETURN_NAMES = ("model", "clip", "vae",)
    FUNCTION = "mergificate"

    CATEGORY = "ttN"

    def mergificate(self, ckpt_A_name, config_A_name, ckpt_B_name, config_B_name, ckpt_C_name, config_C_name,
                model_interpolation, model_multiplier, clip_interpolation, clip_multiplier, save_model, save_prefix,
                model_A_override=None, model_B_override=None, model_C_override=None,
                clip_A_override=None, clip_B_override=None, clip_C_override=None,
                optional_vae=None, prompt=None, extra_pnginfo=None, my_unique_id=None):
        
        def required_assets(model_interpolation, clip_interpolation):
            required = set(["model_A"])
            
            if clip_interpolation in [A_ONLY, B_ONLY, C_ONLY]:
                required.add(f"clip_{clip_interpolation[0]}")
            elif clip_interpolation in [WEIGHTED_SUM, ADD_DIFFERENCE]:
                required.update([f"clip_{letter}" for letter in ABC if letter in clip_interpolation])
            elif clip_interpolation == FOLLOW:
                required.add("clip_A")
            
            if model_interpolation in [WEIGHTED_SUM, ADD_DIFFERENCE]:
                letters = [letter for letter in ABC if letter in model_interpolation]
                required.update([f"model_{letter}" for letter in letters])
                if clip_interpolation == FOLLOW:
                    required.update([f"clip_{letter}" for letter in letters])
            
            return sorted(list(required))

        def _collect_letter(letter, required_list, model_override, clip_override, ckpt_name, config_name = None):
            model, clip, loaded_clip = None, None, None
            config_name = config_name
            
            if f'model_{letter}' in required_list:
                if model_override not in [None, "None"]:
                    model = model_override
                else:
                    if ckpt_name not in [None, "None"]:
                        model, loaded_clip, _ = loader.load_checkpoint(ckpt_name, config_name)
                    else:
                        e = f"Checkpoint name or model override not provided for model_{letter}.\nUnable to merge models using the following interpolation: {model_interpolation}"
                        ttNl(e).t(f'multiModelMerge [{my_unique_id}]').error().p().interrupt(e)


            
            if f'clip_{letter}' in required_list:
                if clip_override is not None:
                    clip = clip_override
                elif loaded_clip is not None:
                    clip = loaded_clip
                elif ckpt_name not in [None, "None"]:
                    _, clip, _ = loader.load_checkpoint(ckpt_name, config_name)
                else:
                    e = f"Checkpoint name or clip override not provided for clip_{letter}.\nUnable to merge clips using the following interpolation: {clip_interpolation}"
                    ttNl(e).t(f'multiModelMerge [{my_unique_id}]').error().p().interrupt(e)
            
            return model, clip


        def merge(base_model, base_strength, patch_model, patch_strength):
            m = base_model.clone()
            kp = patch_model.get_key_patches("diffusion_model.")
            for k in kp:
                m.add_patches({k: kp[k]}, patch_strength, base_strength)
            return m
        
        def clip_merge(base_clip, base_strength, patch_clip, patch_strength):
            m = base_clip.clone()
            kp = patch_clip.get_key_patches()
            for k in kp:
                if k.endswith(".position_ids") or k.endswith(".logit_scale"):
                    continue
                m.add_patches({k: kp[k]}, patch_strength, base_strength)
            return m

        def _add_assets(a1, a2, is_clip=False, multiplier=1.0, weighted=False):
            if is_clip:
                if weighted:
                    return clip_merge(a1, (1.0 - multiplier), a2, multiplier)
                else:
                    return clip_merge(a1, 1.0, a2, multiplier)
            else:
                if weighted:
                    return merge(a1, (1.0 - multiplier), a2, multiplier)
                else:
                    return merge(a1, 1.0, a2, multiplier)
        
        def _subtract_assets(a1, a2, is_clip=False, multiplier=1.0):
            if is_clip:
                    return clip_merge(a1, 1.0, a2, -multiplier)
            else:
                    return merge(a1, 1.0, a2, -multiplier)
        
        required_list = required_assets(model_interpolation, clip_interpolation)
        model_A, clip_A = _collect_letter("A", required_list, model_A_override, clip_A_override, ckpt_A_name, config_A_name)
        model_B, clip_B = _collect_letter("B", required_list, model_B_override, clip_B_override, ckpt_B_name, config_B_name)
        model_C, clip_C = _collect_letter("C", required_list, model_C_override, clip_C_override, ckpt_C_name, config_C_name)
        
        if (model_interpolation == A_ONLY):
            model = model_A
        if (model_interpolation == WEIGHTED_SUM):
            model = _add_assets(model_A, model_B, False, model_multiplier, True)
        if (model_interpolation == ADD_DIFFERENCE):
            model = _add_assets(model_A, _subtract_assets(model_B, model_C), False, model_multiplier)
        
        if (clip_interpolation == FOLLOW):
            clip_interpolation = model_interpolation
        if (clip_interpolation == A_ONLY):
            clip = clip_A
        if (clip_interpolation == B_ONLY):
            clip = clip_B
        if (clip_interpolation == C_ONLY):
            clip = clip_C
        if (clip_interpolation == WEIGHTED_SUM):
            clip = _add_assets(clip_A, clip_B, True, clip_multiplier, True)
        if (clip_interpolation == ADD_DIFFERENCE):
            clip = _add_assets(clip_A, _subtract_assets(clip_B, clip_C, True), True, clip_multiplier)
        

        if optional_vae not in ["None", None]:
            vae_sd = optional_vae.get_sd()
            vae = optional_vae
        else:
            vae_sd = {}
            vae = None

        if save_model == "True":
            full_output_folder, filename, counter, subfolder, save_prefix = folder_paths.get_save_image_path(save_prefix, folder_paths.get_output_directory())

            prompt_info = ""
            if prompt is not None:
                prompt_info = json.dumps(prompt)

            metadata = {}

            enable_modelspec = True
            if isinstance(model.model, comfy.model_base.SDXL):
                metadata["modelspec.architecture"] = "stable-diffusion-xl-v1-base"
            elif isinstance(model.model, comfy.model_base.SDXLRefiner):
                metadata["modelspec.architecture"] = "stable-diffusion-xl-v1-refiner"
            else:
                enable_modelspec = False

            if enable_modelspec:
                metadata["modelspec.sai_model_spec"] = "1.0.0"
                metadata["modelspec.implementation"] = "sgm"
                metadata["modelspec.title"] = "{} {}".format(filename, counter)

            if model.model.model_type == comfy.model_base.ModelType.EPS:
                metadata["modelspec.predict_key"] = "epsilon"
            elif model.model.model_type == comfy.model_base.ModelType.V_PREDICTION:
                metadata["modelspec.predict_key"] = "v"

            if not args.disable_metadata:
                metadata["prompt"] = prompt_info
                if extra_pnginfo is not None:
                    for x in extra_pnginfo:
                        metadata[x] = json.dumps(extra_pnginfo[x])

            output_checkpoint = f"{filename}_{counter:05}_.safetensors"
            output_checkpoint = os.path.join(full_output_folder, output_checkpoint)

            comfy.model_management.load_models_gpu([model, clip.load_model()])
            sd = model.model.state_dict_for_saving(clip.get_sd(), vae_sd)
            comfy.utils.save_torch_file(sd, output_checkpoint, metadata=metadata)

        return (model, clip, vae)

```
