---
tags:
- ImageScaling
- ImageUpscaling
- Upscale
---

# HighRes-Fix Script
## Documentation
- Class name: `HighRes-Fix Script`
- Category: `Efficiency Nodes/Scripts`
- Output node: `False`

The HighRes-Fix Script node is designed to enhance image resolution and quality in a customizable manner. It leverages various upscaling techniques, control nets, and preprocessing steps to refine images, offering options for seed consistency, denoising, and iterative refinement. This node integrates with animation and control net scripts, adapting to specific high-resolution enhancement needs while maintaining the flexibility to work with different upscaling models and preprocessors.
## Input types
### Required
- **`upscale_type`**
    - Specifies the method of upscaling to be used, affecting the quality and approach of the high-resolution output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`hires_ckpt_name`**
    - The checkpoint name for the high-resolution model, indicating the specific model version or configuration to use for upscaling.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`latent_upscaler`**
    - Identifies the latent space upscaling method, which enhances image detail at a foundational level before pixel-level adjustments.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`pixel_upscaler`**
    - Defines the pixel-level upscaling method, refining image details after latent space enhancements.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`upscale_by`**
    - Determines the scaling factor for the upscaling process, directly influencing the final image size and detail.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`use_same_seed`**
    - Controls whether the same seed is used throughout the upscaling process, ensuring consistency in random elements.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`seed`**
    - The initial seed value for random processes, providing a starting point for reproducibility and variation control.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`hires_steps`**
    - Specifies the number of steps to perform in the high-resolution enhancement process, affecting the depth of refinement.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`denoise`**
    - Indicates whether denoising is applied during the upscaling process, improving image clarity by reducing noise.
    - Comfy dtype: `FLOAT`
    - Python dtype: `bool`
- **`iterations`**
    - The number of iterations to run the upscaling process, allowing for multiple passes of refinement.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`use_controlnet`**
    - Determines whether a control net is used for guided upscaling, influencing the direction and quality of enhancements.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`control_net_name`**
    - The name of the control net to be used, specifying the model for guided upscaling.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`strength`**
    - The strength of the control net's influence on the upscaling process, adjusting the level of guidance.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`preprocessor`**
    - The preprocessor method used to prepare images for upscaling, affecting initial quality and compatibility.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`preprocessor_imgs`**
    - Preprocessed images ready for upscaling, serving as the input to the enhancement process.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `list`
### Optional
- **`script`**
    - An optional script containing additional parameters or configurations for the upscaling process.
    - Comfy dtype: `SCRIPT`
    - Python dtype: `dict`
## Output types
- **`script`**
    - Comfy dtype: `SCRIPT`
    - The resulting script configuration after applying the high-resolution fix, encapsulating all specified parameters and adjustments made during the process.
    - Python dtype: `dict`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [KSampler SDXL (Eff.)](../../efficiency-nodes-comfyui/Nodes/KSampler SDXL (Eff.).md)



## Source code
```python
class TSC_HighRes_Fix:

    default_latent_upscalers = LatentUpscaleBy.INPUT_TYPES()["required"]["upscale_method"][0]

    city96_upscale_methods =\
        ["city96." + ver for ver in city96_latent_upscaler.LatentUpscaler.INPUT_TYPES()["required"]["latent_ver"][0]]
    city96_scalings_raw = city96_latent_upscaler.LatentUpscaler.INPUT_TYPES()["required"]["scale_factor"][0]
    city96_scalings_float = [float(scale) for scale in city96_scalings_raw]

    ttl_nn_upscale_methods = \
        ["ttl_nn." + ver for ver in
         ttl_nn_latent_upscaler.NNLatentUpscale.INPUT_TYPES()["required"]["version"][0]]

    latent_upscalers = default_latent_upscalers + city96_upscale_methods + ttl_nn_upscale_methods
    pixel_upscalers = folder_paths.get_filename_list("upscale_models")

    @classmethod
    def INPUT_TYPES(cls):

        return {"required": {"upscale_type": (["latent","pixel","both"],),
                             "hires_ckpt_name": (["(use same)"] + folder_paths.get_filename_list("checkpoints"),),
                             "latent_upscaler": (cls.latent_upscalers,),
                             "pixel_upscaler": (cls.pixel_upscalers,),
                             "upscale_by": ("FLOAT", {"default": 1.25, "min": 0.01, "max": 8.0, "step": 0.05}),
                             "use_same_seed": ("BOOLEAN", {"default": True}),
                             "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                             "hires_steps": ("INT", {"default": 12, "min": 1, "max": 10000}),
                             "denoise": ("FLOAT", {"default": .56, "min": 0.00, "max": 1.00, "step": 0.01}),
                             "iterations": ("INT", {"default": 1, "min": 0, "max": 5, "step": 1}),
                             "use_controlnet": use_controlnet_widget,
                             "control_net_name": (folder_paths.get_filename_list("controlnet"),),
                             "strength": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01}),
                             "preprocessor": preprocessor_widget,
                             "preprocessor_imgs": ("BOOLEAN", {"default": False})
                             },
                "optional": {"script": ("SCRIPT",)},
                "hidden": {"my_unique_id": "UNIQUE_ID"}
                }

    RETURN_TYPES = ("SCRIPT",)
    FUNCTION = "hires_fix_script"
    CATEGORY = "Efficiency Nodes/Scripts"

    def hires_fix_script(self, upscale_type, hires_ckpt_name, latent_upscaler, pixel_upscaler, upscale_by,
                         use_same_seed, seed, hires_steps, denoise, iterations, use_controlnet, control_net_name,
                         strength, preprocessor, preprocessor_imgs, script=None, my_unique_id=None):
        latent_upscale_function = None
        latent_upscale_model = None
        pixel_upscale_model = None

        def float_to_string(num):
            if num == int(num):
                return "{:.1f}".format(num)
            else:
                return str(num)

        if iterations > 0 and upscale_by > 0:
            if upscale_type == "latent":
                # For latent methods from city96
                if latent_upscaler in self.city96_upscale_methods:
                    # Remove extra characters added
                    latent_upscaler = latent_upscaler.replace("city96.", "")

                    # Set function to city96_latent_upscaler.LatentUpscaler
                    latent_upscale_function = city96_latent_upscaler.LatentUpscaler

                    # Find the nearest valid scaling in city96_scalings_float
                    nearest_scaling = min(self.city96_scalings_float, key=lambda x: abs(x - upscale_by))

                    # Retrieve the index of the nearest scaling
                    nearest_scaling_index = self.city96_scalings_float.index(nearest_scaling)

                    # Use the index to get the raw string representation
                    nearest_scaling_raw = self.city96_scalings_raw[nearest_scaling_index]

                    upscale_by = float_to_string(upscale_by)

                    # Check if the input upscale_by value was different from the nearest valid value
                    if upscale_by != nearest_scaling_raw:
                        print(f"{warning('HighRes-Fix Warning:')} "
                              f"When using 'city96.{latent_upscaler}', 'upscale_by' must be one of {self.city96_scalings_raw}.\n"
                              f"Rounding to the nearest valid value ({nearest_scaling_raw}).\033[0m")
                        upscale_by = nearest_scaling_raw

                # For ttl upscale methods
                elif latent_upscaler in self.ttl_nn_upscale_methods:
                    # Remove extra characters added
                    latent_upscaler = latent_upscaler.replace("ttl_nn.", "")

                    # Bound to min/max limits
                    upscale_by_clamped = min(max(upscale_by, 1), 2)
                    if upscale_by != upscale_by_clamped:
                        print(f"{warning('HighRes-Fix Warning:')} "
                              f"When using 'ttl_nn.{latent_upscaler}', 'upscale_by' must be between 1 and 2.\n"
                              f"Rounding to the nearest valid value ({upscale_by_clamped}).\033[0m")
                    upscale_by = upscale_by_clamped

                    latent_upscale_function = ttl_nn_latent_upscaler.NNLatentUpscale

                # For default upscale methods
                elif latent_upscaler in self.default_latent_upscalers:
                    latent_upscale_function = LatentUpscaleBy

                else: # Default
                    latent_upscale_function = LatentUpscaleBy
                    latent_upscaler = self.default_latent_upscalers[0]
                    print(f"{warning('HiResFix Script Warning:')} Chosen latent upscale method not found! "
                          f"defaulting to '{latent_upscaler}'.\n")

                # Load Checkpoint if defined
                if hires_ckpt_name == "(use same)":
                    clear_cache(my_unique_id, 0, "ckpt")
                else:
                    latent_upscale_model, _, _ = \
                        load_checkpoint(hires_ckpt_name, my_unique_id, output_vae=False, cache=1, cache_overwrite=True)

            elif upscale_type == "pixel":
                pixel_upscale_model = UpscaleModelLoader().load_model(pixel_upscaler)[0]

            elif upscale_type == "both":
                latent_upscale_function = LatentUpscaleBy
                latent_upscaler = self.default_latent_upscalers[0]
                pixel_upscale_model = UpscaleModelLoader().load_model(pixel_upscaler)[0]

                if hires_ckpt_name == "(use same)":
                    clear_cache(my_unique_id, 0, "ckpt")
                else:
                    latent_upscale_model, _, _ = \
                        load_checkpoint(hires_ckpt_name, my_unique_id, output_vae=False, cache=1, cache_overwrite=True)

        control_net = ControlNetLoader().load_controlnet(control_net_name)[0] if use_controlnet is True else None

        # Construct the script output
        script = script or {}
        script["hiresfix"] = (upscale_type, latent_upscaler, upscale_by, use_same_seed, seed, hires_steps,
                              denoise, iterations, control_net, strength, preprocessor, preprocessor_imgs,
                              latent_upscale_function, latent_upscale_model, pixel_upscale_model)

        return (script,)

```
