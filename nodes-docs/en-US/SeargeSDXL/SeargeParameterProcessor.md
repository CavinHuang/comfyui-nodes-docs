---
tags:
- Searge
---

# Parameter Processor
## Documentation
- Class name: `SeargeParameterProcessor`
- Category: `Searge/_deprecated_/UI`
- Output node: `False`

The SeargeParameterProcessor node is designed to process and refine parameters for image generation tasks, incorporating advanced settings such as seed manipulation, style template adjustments, and high-resolution fix parameters. It acts as a central hub for configuring the generation process, ensuring that inputs like prompts, generation parameters, and model names are optimally adjusted for the desired output.
## Input types
### Required
- **`inputs`**
    - Accepts a variety of parameters for processing, including but not limited to prompts, generation parameters, model names, and advanced settings, allowing for a comprehensive customization of the image generation process.
    - Comfy dtype: `PARAMETER_INPUTS`
    - Python dtype: `dict`
## Output types
- **`parameters`**
    - Comfy dtype: `PARAMETERS`
    - Outputs a dictionary of processed parameters, ready for use in the image generation process, ensuring that all inputs have been optimally adjusted for the desired outcome.
    - Python dtype: `dict`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SeargeParameterProcessor:
    # hard - refiner uses same seed as base | soft - refiner uses different seed from base
    REFINER_INTENSITY = ["hard", "soft"]
    # same - HRF uses same seed as image generation | distinct - HRF uses different seed than image generation
    HRF_SEED_OFFSET = ["same", "distinct"]
    # simple "boolean"-like type
    STATES = ["disabled", "enabled"]
    # operating modes, determine if the latent source is empty or from a source image, inpainting also uses mask
    OPERATION_MODE = ["text to image", "image to image", "inpainting"]
    # sorted from easy-to-use to harder-to-use
    PROMPT_STYLE = ["simple", "3 prompts G+L-N", "subject focus", "style focus", "weighted", "overlay",
                    "subject - style", "style - subject", "style only", "weighted - overlay", "overlay - weighted"]
    # (work in progress)
    STYLE_TEMPLATE = ["none", "from preprocessor", "test"]
    # save folder for generated images
    SAVE_TO = ["output folder", "input folder"]

    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "inputs": ("PARAMETER_INPUTS",),
        },
        }

    RETURN_TYPES = ("PARAMETERS",)
    RETURN_NAMES = ("parameters",)
    FUNCTION = "process"

    CATEGORY = "Searge/_deprecated_/UI"

    def process(self, inputs):
        if inputs is None:
            parameters = {}
        else:
            parameters = inputs

        if parameters["denoise"] is None:
            parameters["denoise"] = 1.0

        saturation = parameters["refiner_intensity"]
        if saturation is not None:
            # "soft"
            if saturation == SeargeParameterProcessor.REFINER_INTENSITY[1]:
                parameters["noise_offset"] = 1
            # incl. SeargeParameterProcessor.REFINER_INTENSITY[1] -> "hard"
            else:
                parameters["noise_offset"] = 0

        hires_fix = parameters["hires_fix"]
        # "disabled"
        if hires_fix is not None and hires_fix == SeargeParameterProcessor.STATES[0]:
            parameters["hrf_steps"] = 0

        hrf_saturation = parameters["hrf_intensity"]
        if hrf_saturation is not None:
            # "soft"
            if hrf_saturation == SeargeParameterProcessor.REFINER_INTENSITY[1]:
                parameters["hrf_noise_offset"] = 1
            # incl. SeargeParameterProcessor.REFINER_INTENSITY[0] -> "hard"
            else:
                parameters["hrf_noise_offset"] = 0

        seed_offset = parameters["hrf_seed_offset"]
        if seed_offset is not None:
            seed = parameters["seed"] if parameters["seed"] is not None else 0
            # "distinct"
            if seed_offset == SeargeParameterProcessor.HRF_SEED_OFFSET[1]:
                parameters["hrf_seed"] = seed + 3
            # incl. SeargeParameterProcessor.HRF_SEED_OFFSET[0] -> "same"
            else:
                parameters["hrf_seed"] = seed

        style_template = parameters["style_template"]
        if style_template is not None:
            # "from preprocessor"
            if style_template == SeargeParameterProcessor.STYLE_TEMPLATE[1]:
                # this does nothing here, but will be used in the preprocessor
                pass
            # "test"
            if style_template == SeargeParameterProcessor.STYLE_TEMPLATE[2]:
                if parameters["noise_offset"] is not None:
                    parameters["noise_offset"] = 1 - parameters["hrf_noise_offset"]
                if parameters["hrf_noise_offset"] is not None:
                    parameters["hrf_noise_offset"] = 1 - parameters["hrf_noise_offset"]
            # incl. SeargeParameterProcessor.STYLE_TEMPLATE[0] -> "none"
            else:
                # TODO: apply style based on its name here...
                pass

        operation_mode = parameters["operation_mode"]
        if operation_mode is not None:
            # "image to image":
            if operation_mode == SeargeParameterProcessor.OPERATION_MODE[1]:
                parameters["operation_selector"] = 1
            # "inpainting":
            elif operation_mode == SeargeParameterProcessor.OPERATION_MODE[2]:
                parameters["operation_selector"] = 2
            # incl. SeargeParameterProcessor.OPERATION_MODE[0] -> "text to image":
            else:
                parameters["operation_selector"] = 0
                # always fully denoise in img2img mode
                parameters["denoise"] = 1.0

        prompt_style = parameters["prompt_style"]
        if prompt_style is not None:
            # "simple"
            if prompt_style == SeargeParameterProcessor.PROMPT_STYLE[0]:
                parameters["prompt_style_selector"] = 0
                parameters["prompt_style_group"] = 0
                main_prompt = parameters["main_prompt"]
                parameters["secondary_prompt"] = main_prompt
                parameters["style_prompt"] = ""
                parameters["negative_style"] = ""
            # "subject focus"
            elif prompt_style == SeargeParameterProcessor.PROMPT_STYLE[2]:
                parameters["prompt_style_selector"] = 1
                parameters["prompt_style_group"] = 0
            # "style focus"
            elif prompt_style == SeargeParameterProcessor.PROMPT_STYLE[3]:
                parameters["prompt_style_selector"] = 2
                parameters["prompt_style_group"] = 0
            # "weighted"
            elif prompt_style == SeargeParameterProcessor.PROMPT_STYLE[4]:
                parameters["prompt_style_selector"] = 3
                parameters["prompt_style_group"] = 0
            # "overlay"
            elif prompt_style == SeargeParameterProcessor.PROMPT_STYLE[5]:
                parameters["prompt_style_selector"] = 4
                parameters["prompt_style_group"] = 0
            # "subject - style"
            elif prompt_style == SeargeParameterProcessor.PROMPT_STYLE[6]:
                parameters["prompt_style_selector"] = 0
                parameters["prompt_style_group"] = 1
            # "style - subject"
            elif prompt_style == SeargeParameterProcessor.PROMPT_STYLE[7]:
                parameters["prompt_style_selector"] = 1
                parameters["prompt_style_group"] = 1
            # "style only"
            elif prompt_style == SeargeParameterProcessor.PROMPT_STYLE[8]:
                parameters["prompt_style_selector"] = 2
                parameters["prompt_style_group"] = 1
            # "weighted - overlay"
            elif prompt_style == SeargeParameterProcessor.PROMPT_STYLE[9]:
                parameters["prompt_style_selector"] = 3
                parameters["prompt_style_group"] = 1
            # "overlay - weighted"
            elif prompt_style == SeargeParameterProcessor.PROMPT_STYLE[10]:
                parameters["prompt_style_selector"] = 4
                parameters["prompt_style_group"] = 1
            # incl. SeargeParameterProcessor.PROMPT_STYLE[1] -> "3 prompts G+L-N"
            else:
                parameters["prompt_style_selector"] = 0
                parameters["prompt_style_group"] = 0
                parameters["style_prompt"] = ""
                parameters["negative_style"] = ""

        # TODO: replace this special logic and the dirty hacks by creating new generated parameters for saving
        save_image = parameters["save_image"]
        if save_image is not None:
            # "disabled"
            if save_image == SeargeParameterProcessor.STATES[0]:
                # when image saving is disabled, we also don't want to save the upscaled image, even if that's enabled
                parameters["save_upscaled_image"] = SeargeParameterProcessor.STATES[0]
                # HACK: this is a bit dirty, but the variable hires_fix determines if the image should be saved
                #       but when image saving is disabled, we don't want that to happen
                parameters["hires_fix"] = SeargeParameterProcessor.STATES[0]
            # "enabled"
            else:
                # in case we are saving to the input folder, we need to enable saving after the hires fix, even
                # if that's disabled in the settings
                if parameters["save_directory"] == SeargeParameterProcessor.SAVE_TO[1]:
                    parameters["hires_fix"] = SeargeParameterProcessor.STATES[1]

        return (parameters,)

```
