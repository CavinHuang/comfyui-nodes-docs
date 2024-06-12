---
tags:
- Searge
---

# Generation Parameters
## Documentation
- Class name: `SeargeOutput2`
- Category: `Searge/_deprecated_/UI/Outputs`
- Output node: `False`

The SeargeOutput2 node is designed to demultiplex and output a set of generation parameters for image creation, including seed, dimensions, steps, and configuration settings. It plays a crucial role in configuring the generative process by providing detailed control over the generation parameters.
## Input types
### Required
- **`parameters`**
    - This parameter contains all the necessary settings for image generation, including seed, image dimensions, steps, CFG scale, sampler and scheduler names, and options for saving images. It's essential for defining the behavior and output of the generative process.
    - Comfy dtype: `PARAMETERS`
    - Python dtype: `Dict[str, Union[int, float, str, bool]]`
## Output types
- **`parameters`**
    - Comfy dtype: `PARAMETERS`
    - Returns the original set of parameters provided as input, facilitating further processing or utilization in the workflow.
    - Python dtype: `Dict[str, Union[int, float, str, bool]]`
- **`seed`**
    - Comfy dtype: `INT`
    - The seed value for random number generation, ensuring reproducibility of the generated images.
    - Python dtype: `int`
- **`image_width`**
    - Comfy dtype: `INT`
    - The width of the generated image in pixels.
    - Python dtype: `int`
- **`image_height`**
    - Comfy dtype: `INT`
    - The height of the generated image in pixels.
    - Python dtype: `int`
- **`steps`**
    - Comfy dtype: `INT`
    - The number of steps to run the generation process, affecting the detail and quality of the output.
    - Python dtype: `int`
- **`cfg`**
    - Comfy dtype: `FLOAT`
    - The CFG scale used to control the trade-off between fidelity to the text prompt and the randomness of the generated images.
    - Python dtype: `float`
- **`sampler_name`**
    - Comfy dtype: `SAMPLER_NAME`
    - The name of the sampler algorithm used for image generation.
    - Python dtype: `str`
- **`scheduler`**
    - Comfy dtype: `SCHEDULER_NAME`
    - The name of the scheduler algorithm used to manage the generation steps.
    - Python dtype: `str`
- **`save_image`**
    - Comfy dtype: `ENABLE_STATE`
    - A boolean indicating whether the generated image should be saved.
    - Python dtype: `bool`
- **`save_directory`**
    - Comfy dtype: `SAVE_FOLDER`
    - The directory path where the generated image will be saved, if applicable.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SeargeOutput2:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "parameters": ("PARAMETERS",),
        },
        }

    RETURN_TYPES = ("PARAMETERS", "INT", "INT", "INT", "INT", "FLOAT", "SAMPLER_NAME", "SCHEDULER_NAME",
                    "ENABLE_STATE", "SAVE_FOLDER",)
    RETURN_NAMES = ("parameters", "seed", "image_width", "image_height", "steps", "cfg", "sampler_name", "scheduler",
                    "save_image", "save_directory",)
    FUNCTION = "demux"

    CATEGORY = "Searge/_deprecated_/UI/Outputs"

    def demux(self, parameters):
        seed = parameters["seed"]
        image_width = parameters["image_width"]
        image_height = parameters["image_height"]
        steps = parameters["steps"]
        cfg = parameters["cfg"]
        sampler_name = parameters["sampler_name"]
        scheduler = parameters["scheduler"]
        save_image = parameters["save_image"]
        save_directory = parameters["save_directory"]

        return (parameters, seed, image_width, image_height, steps, cfg, sampler_name, scheduler, save_image,
                save_directory,)

```
