---
tags:
- Conditioning
- Context
---

# Dependencies Edit
## Documentation
- Class name: `DependenciesEdit`
- Category: `Art Venture/Utils`
- Output node: `False`

The `DependenciesEdit` node is designed to modify and update the dependencies required for art generation processes. It allows for the customization of various components such as VAE models, checkpoints, CLIP models, and more, based on the provided inputs. This node plays a crucial role in tailoring the art generation pipeline to specific needs by adjusting the underlying dependencies.
## Input types
### Required
- **`dependencies`**
    - A tuple containing the current set of dependencies, which this node will modify based on the other input parameters. It's the core input that determines the starting point for any modifications.
    - Comfy dtype: `DEPENDENCIES`
    - Python dtype: `Tuple`
### Optional
- **`ckpt_name`**
    - Determines the checkpoint name for the model, enabling the selection from available checkpoints or specifying custom ones.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`vae_name`**
    - Specifies the name of the VAE model to be used, allowing for the selection from predefined options or custom models.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`clip`**
    - Defines the CLIP model to be utilized, offering flexibility in choosing the appropriate model for the task.
    - Comfy dtype: `CLIP`
    - Python dtype: `Optional[str]`
- **`clip_skip`**
    - Sets the number of layers to skip in the CLIP model, optimizing performance or accuracy as needed.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`positive`**
    - A positive prompt to influence the generation process, enhancing the creative output.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`negative`**
    - A negative prompt to steer away the generation from undesired directions, refining the results.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`lora_stack`**
    - Specifies the LoRA stack to be applied, allowing for advanced model adaptation and fine-tuning.
    - Comfy dtype: `LORA_STACK`
    - Python dtype: `Optional[Tuple]`
- **`cnet_stack`**
    - Determines the ControlNet stack to be used, enabling precise control over the generation process.
    - Comfy dtype: `CONTROL_NET_STACK`
    - Python dtype: `Optional[Tuple]`
## Output types
- **`dependencies`**
    - Comfy dtype: `DEPENDENCIES`
    - The modified set of dependencies, reflecting the updates made based on the input parameters.
    - Python dtype: `Tuple`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class UtilDependenciesEdit:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "dependencies": ("DEPENDENCIES",),
            },
            "optional": {
                "ckpt_name": (
                    [
                        "Original",
                    ]
                    + folder_paths.get_filename_list("checkpoints"),
                ),
                "vae_name": (["Original", "Baked VAE"] + folder_paths.get_filename_list("vae"),),
                "clip": ("CLIP",),
                "clip_skip": (
                    "INT",
                    {"default": 0, "min": -24, "max": 0, "step": 1},
                ),
                "positive": ("STRING", {"default": "Original", "multiline": True}),
                "negative": ("STRING", {"default": "Original", "multiline": True}),
                "lora_stack": ("LORA_STACK",),
                "cnet_stack": ("CONTROL_NET_STACK",),
            },
        }

    RETURN_TYPES = ("DEPENDENCIES",)
    CATEGORY = "Art Venture/Utils"
    FUNCTION = "edit_dependencies"

    def edit_dependencies(
        self,
        dependencies: Tuple,
        vae_name="Original",
        ckpt_name="Original",
        clip=None,
        clip_skip=0,
        positive="Original",
        negative="Original",
        lora_stack=None,
        cnet_stack=None,
    ):
        (
            _vae_name,
            _ckpt_name,
            _clip,
            _clip_skip,
            _positive_prompt,
            _negative_prompt,
            _lora_stack,
            _cnet_stack,
        ) = dependencies

        if vae_name != "Original":
            _vae_name = vae_name
        if ckpt_name != "Original":
            _ckpt_name = ckpt_name
        if clip is not None:
            _clip = clip
        if clip_skip < 0:
            _clip_skip = clip_skip
        if positive != "Original":
            _positive_prompt = positive
        if negative != "Original":
            _negative_prompt = negative
        if lora_stack is not None:
            _lora_stack = lora_stack
        if cnet_stack is not None:
            _cnet_stack = cnet_stack

        dependencies = (
            _vae_name,
            _ckpt_name,
            _clip,
            _clip_skip,
            _positive_prompt,
            _negative_prompt,
            _lora_stack,
            _cnet_stack,
        )

        print("Dependencies:", dependencies)

        return (dependencies,)

```
