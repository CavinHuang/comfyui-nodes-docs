# IPA Configuration  🎞️🅢🅜
## Documentation
- Class name: `IpaConfiguration`
- Category: `Steerable-Motion`
- Output node: `False`

The IpaConfiguration node is designed to configure and apply advanced image processing adjustments (IPA) settings for steerable motion in image generation, focusing on parameters like start and end points, weight, scaling, and noise characteristics to enhance the visual output.
## Input types
### Required
- **`ipa_starts_at`**
    - Specifies the starting point of the IPA effect, influencing when the adjustments begin to take effect in the image generation process.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`ipa_ends_at`**
    - Defines the ending point of the IPA effect, determining when the adjustments cease to have an impact, thus shaping the duration of the effect.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`ipa_weight_type`**
    - Determines the type of weighting applied to the IPA effect, such as 'ease in-out', affecting the transition smoothness of the adjustments.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`ipa_weight`**
    - Sets the overall weight of the IPA effect, controlling the intensity of the applied adjustments.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`ipa_embeds_scaling`**
    - Specifies the scaling method for embeddings, like 'V only', impacting how the adjustments are applied in terms of visual representation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`ipa_noise_strength`**
    - Controls the strength of noise added to the image, influencing the texture and detail level.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`use_image_for_noise`**
    - Indicates whether an image is used as the source for noise, affecting the noise pattern and realism in the output.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`type_of_noise`**
    - Specifies the type of noise, such as 'fade', affecting the visual characteristics of the noise applied.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`noise_blur`**
    - Determines the level of blur applied to the noise, influencing the softness and subtlety of the noise effect.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
## Output types
- **`configuration`**
    - Comfy dtype: `ADVANCED_IPA_SETTINGS`
    - Returns the configured advanced IPA settings, encapsulating all specified adjustments for steerable motion in image generation.
    - Python dtype: `dict`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class IpaConfigurationNode:
    WEIGHT_TYPES = ["linear", "ease in", "ease out", 'ease in-out', 'reverse in-out', 'weak input', 'weak output', 'weak middle', 'strong middle']
    IPA_EMBEDS_SCALING_OPTIONS = ["V only", "K+V", "K+V w/ C penalty", "K+mean(V) w/ C penalty"]

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "ipa_starts_at": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                "ipa_ends_at": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                "ipa_weight_type": (cls.WEIGHT_TYPES,),
                "ipa_weight": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 2.0, "step": 0.01}),
                "ipa_embeds_scaling": (cls.IPA_EMBEDS_SCALING_OPTIONS,),
                "ipa_noise_strength": ("FLOAT", {"default": 0.3, "min": 0.0, "max": 1.0, "step": 0.01}),
                "use_image_for_noise": ("BOOLEAN", {"default": False}),                                  
                "type_of_noise": (["fade", "dissolve", "gaussian", "shuffle"], ),
                "noise_blur": ("INT", { "default": 0, "min": 0, "max": 32, "step": 1 }),
            },
            "optional": {}
        }
    
    FUNCTION = "process_inputs"
    RETURN_TYPES = ("ADVANCED_IPA_SETTINGS",)
    RETURN_NAMES = ("configuration",)
    CATEGORY = "Steerable-Motion"

    @classmethod
    def process_inputs(cls, ipa_starts_at, ipa_ends_at, ipa_weight_type, ipa_weight, ipa_embeds_scaling, ipa_noise_strength, use_image_for_noise, type_of_noise, noise_blur):
        return {
            "ipa_starts_at": ipa_starts_at,
            "ipa_ends_at": ipa_ends_at,
            "ipa_weight_type": ipa_weight_type,
            "ipa_weight": ipa_weight,
            "ipa_embeds_scaling": ipa_embeds_scaling,
            "ipa_noise_strength": ipa_noise_strength,
            "use_image_for_noise": use_image_for_noise,
            "type_of_noise": type_of_noise,
            "noise_blur": noise_blur,
        },

```
