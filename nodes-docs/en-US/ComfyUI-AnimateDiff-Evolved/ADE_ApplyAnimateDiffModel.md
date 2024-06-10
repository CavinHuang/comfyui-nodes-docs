---
tags:
- AnimateDiff
- Animation
---

# Apply AnimateDiff Model (Adv.) 🎭🅐🅓②
## Documentation
- Class name: `ADE_ApplyAnimateDiffModel`
- Category: `Animate Diff 🎭🅐🅓/② Gen2 nodes ②`
- Output node: `False`

The ADE_ApplyAnimateDiffModel node is designed to apply advanced AnimateDiff model configurations to generate motion in images. It leverages a comprehensive set of parameters to fine-tune the animation process, accommodating a wide range of motion effects and styles.
## Input types
### Required
- **`motion_model`**
    - Specifies the motion model to be used for animation. It is crucial for defining the animation's behavior and characteristics.
    - Comfy dtype: `MOTION_MODEL_ADE`
    - Python dtype: `MotionModelPatcher`
- **`start_percent`**
    - Defines the starting percentage of the animation effect, marking the beginning of the motion's application.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end_percent`**
    - Specifies the ending percentage of the animation effect, determining the point at which the motion ceases.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`motion_lora`**
    - Optional parameter that allows for the adjustment of motion using LoRA (Low-Rank Adaptation) techniques, enhancing the animation's quality.
    - Comfy dtype: `MOTION_LORA`
    - Python dtype: `MotionLoraList`
- **`scale_multival`**
    - Optional parameter that influences the scale of the animation effect, allowing for fine-tuning of the animation's intensity.
    - Comfy dtype: `MULTIVAL`
    - Python dtype: `float`
- **`effect_multival`**
    - Optional parameter that adjusts the overall effect of the animation, enabling customization of the visual outcome.
    - Comfy dtype: `MULTIVAL`
    - Python dtype: `float`
- **`ad_keyframes`**
    - Optional parameter that specifies keyframes for the animation, allowing for precise control over the motion's timing and sequence.
    - Comfy dtype: `AD_KEYFRAMES`
    - Python dtype: `ADKeyframeGroup`
- **`prev_m_models`**
    - Optional parameter that includes previous motion models to be considered in the current animation process, allowing for cumulative effects.
    - Comfy dtype: `M_MODELS`
    - Python dtype: `M_MODELS`
## Output types
- **`m_models`**
    - Comfy dtype: `M_MODELS`
    - Outputs the motion models used in the animation process, encapsulating all adjustments and configurations made.
    - Python dtype: `M_MODELS`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [ADE_UseEvolvedSampling](../../ComfyUI-AnimateDiff-Evolved/Nodes/ADE_UseEvolvedSampling.md)



## Source code
```python
class ApplyAnimateDiffModelNode:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "motion_model": ("MOTION_MODEL_ADE",),
                "start_percent": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.001}),
                "end_percent": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.001}),
            },
            "optional": {
                "motion_lora": ("MOTION_LORA",),
                "scale_multival": ("MULTIVAL",),
                "effect_multival": ("MULTIVAL",),
                "ad_keyframes": ("AD_KEYFRAMES",),
                "prev_m_models": ("M_MODELS",),
            }
        }
    
    RETURN_TYPES = ("M_MODELS",)
    CATEGORY = "Animate Diff 🎭🅐🅓/② Gen2 nodes ②"
    FUNCTION = "apply_motion_model"

    def apply_motion_model(self, motion_model: MotionModelPatcher, start_percent: float=0.0, end_percent: float=1.0,
                           motion_lora: MotionLoraList=None, ad_keyframes: ADKeyframeGroup=None,
                           scale_multival=None, effect_multival=None,
                           prev_m_models: MotionModelGroup=None,):
        # set up motion models list
        if prev_m_models is None:
            prev_m_models = MotionModelGroup()
        prev_m_models = prev_m_models.clone()
        motion_model = motion_model.clone()
        # check if internal motion model already present in previous model - create new if so
        for prev_model in prev_m_models.models:
            if motion_model.model is prev_model.model:
                # need to create new internal model based on same state_dict
                motion_model = create_fresh_motion_module(motion_model)
        # apply motion model to loaded_mm
        if motion_lora is not None:
            for lora in motion_lora.loras:
                load_motion_lora_as_patches(motion_model, lora)
        motion_model.scale_multival = scale_multival
        motion_model.effect_multival = effect_multival
        motion_model.keyframes = ad_keyframes.clone() if ad_keyframes else ADKeyframeGroup()
        motion_model.timestep_percent_range = (start_percent, end_percent)
        # add to beginning, so that after injection, it will be the earliest of prev_m_models to be run
        prev_m_models.add_to_start(mm=motion_model)
        return (prev_m_models,)

```
