---
tags:
- ControlNet
---

# Controlnet Adapter v2
## Documentation
- Class name: `SeargeControlnetAdapterV2`
- Category: `Searge/UI/Prompting`
- Output node: `False`

The SeargeControlnetAdapterV2 node serves as an interface for adapting and applying control network configurations and annotations to input data, facilitating the enhancement or modification of images through various controlnet modes and preprocessing options. It abstracts the complexity of controlnet operations, offering customizable parameters to fine-tune the application of these networks on the input data.
## Input types
### Required
- **`controlnet_mode`**
    - Specifies the mode of operation for the control network, allowing users to select different controlnet configurations for processing the input data.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`controlnet_preprocessor`**
    - A boolean flag indicating whether preprocessing should be applied before the controlnet operation, affecting the input data's preparation.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`strength`**
    - Determines the intensity of the controlnet effect, allowing for fine-tuning of the applied enhancements or modifications.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`low_threshold`**
    - Sets the lower threshold for controlnet processing, influencing the sensitivity of the operation to input data features.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`high_threshold`**
    - Defines the upper threshold for controlnet processing, adjusting the operation's responsiveness to prominent features in the input data.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`start_percent`**
    - Specifies the starting percentage of the input data to be processed, enabling selective application of the controlnet operation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`end_percent`**
    - Indicates the ending percentage of the input data that will undergo controlnet processing, allowing for targeted modifications.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`noise_augmentation`**
    - Controls the level of noise augmentation applied to the input data, enhancing the robustness of the controlnet operation.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`revision_enhancer`**
    - A boolean parameter that activates an additional enhancement layer post-controlnet processing, refining the output quality.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
### Optional
- **`data`**
    - An optional data stream input that can be processed alongside image inputs for integrated controlnet operations.
    - Comfy dtype: `SRG_DATA_STREAM`
    - Python dtype: `str`
- **`source_image`**
    - An optional image input that the controlnet operation can directly modify or enhance.
    - Comfy dtype: `IMAGE`
    - Python dtype: `str`
## Output types
- **`data`**
    - Comfy dtype: `SRG_DATA_STREAM`
    - Outputs the processed data stream, incorporating the applied controlnet modifications.
    - Python dtype: `str`
- **`preview`**
    - Comfy dtype: `IMAGE`
    - Provides a preview image showcasing the effects of the controlnet operation on the input data.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SeargeControlnetAdapterV2:
    def __init__(self):
        self.expected_size = None

        self.hed_annotator = "ControlNetHED.pth"
        self.leres_annotator = "res101.pth"

        self.hed_annotator_full_path = get_full_path("annotators", self.hed_annotator)
        self.leres_annotator_full_path = get_full_path("annotators", self.leres_annotator)

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "controlnet_mode": (UI.CONTROLNET_MODES, {"default": UI.NONE},),
                "controlnet_preprocessor": ("BOOLEAN", {"default": False},),
                "strength": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 10.0, "step": 0.05},),
                "low_threshold": ("FLOAT", {"default": 0.25, "min": 0.0, "max": 1.0, "step": 0.05},),
                "high_threshold": ("FLOAT", {"default": 0.5, "min": 0.0, "max": 1.0, "step": 0.05},),
                "start_percent": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.05},),
                "end_percent": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.05},),
                "noise_augmentation": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 1.0, "step": 0.05},),
                "revision_enhancer": ("BOOLEAN", {"default": False},),
            },
            "optional": {
                "data": ("SRG_DATA_STREAM",),
                "source_image": ("IMAGE",),
            },
        }

    RETURN_TYPES = ("SRG_DATA_STREAM", "IMAGE",)
    RETURN_NAMES = ("data", "preview",)
    FUNCTION = "get_value"

    CATEGORY = UI.CATEGORY_UI_PROMPTING

    def process_image(self, image, mode, low_threshold, high_threshold):
        if mode == UI.CN_MODE_CANNY:
            image = canny(image, low_threshold, high_threshold)

        elif mode == UI.CN_MODE_DEPTH:
            image = leres(image, low_threshold, high_threshold, self.leres_annotator_full_path)

        elif mode == UI.CN_MODE_SKETCH:
            image = hed(image, self.hed_annotator_full_path)

        else:
            # do nothing for any other mode, just use the provided image unchanged
            pass

        return image

    def create_dict(self, stack, source_image, controlnet_mode, controlnet_preprocessor, strength,
                    low_threshold, high_threshold, start, end, noise_augmentation, revision_enhancer):
        if controlnet_mode is None or controlnet_mode == UI.NONE:
            cn_image = None
        else:
            cn_image = source_image

        low_threshold = round(low_threshold, 3)
        high_threshold = round(high_threshold, 3)

        # NOTE: for the modes "revision" and "custom" no image pre-processing is needed
        if controlnet_mode == UI.CN_MODE_REVISION or controlnet_mode == UI.CUSTOM:
            controlnet_preprocessor = False

        if controlnet_preprocessor and cn_image is not None:
            cn_image = self.process_image(cn_image, controlnet_mode, low_threshold, high_threshold)

        stack += [
            {
                UI.F_REV_CN_IMAGE: cn_image,
                UI.F_REV_CN_IMAGE_CHANGED: True,
                UI.F_REV_CN_MODE: controlnet_mode,
                UI.F_CN_PRE_PROCESSOR: controlnet_preprocessor,
                UI.F_REV_CN_STRENGTH: round(strength, 3),
                UI.F_CN_LOW_THRESHOLD: low_threshold,
                UI.F_CN_HIGH_THRESHOLD: high_threshold,
                UI.F_CN_START: round(start, 3),
                UI.F_CN_END: round(end, 3),
                UI.F_REV_NOISE_AUGMENTATION: round(noise_augmentation, 3),
                UI.F_REV_ENHANCER: revision_enhancer,
            }
        ]

        return (
            {
                UI.F_CN_STACK: stack,
            },
            cn_image,
        )

    def get_value(self, controlnet_mode, controlnet_preprocessor, strength, low_threshold, high_threshold,
                  start_percent, end_percent, noise_augmentation, revision_enhancer, source_image=None, data=None):
        if data is None:
            data = {}

        stack = retrieve_parameter(UI.F_CN_STACK, retrieve_parameter(UI.S_CONTROLNET_INPUTS, data), [])

        if self.expected_size is None:
            self.expected_size = len(stack)
        elif self.expected_size == 0:
            stack = []
        elif len(stack) > self.expected_size:
            stack = stack[:self.expected_size]

        (stack_entry, image) = self.create_dict(
            stack,
            source_image,
            controlnet_mode,
            controlnet_preprocessor,
            strength,
            low_threshold,
            high_threshold,
            start_percent,
            end_percent,
            noise_augmentation,
            revision_enhancer,
        )

        data[UI.S_CONTROLNET_INPUTS] = stack_entry

        return (data, image,)

```
