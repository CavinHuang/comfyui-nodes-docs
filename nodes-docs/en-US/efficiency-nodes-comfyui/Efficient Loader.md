---
tags:
- Loader
- Model
- ModelIO
- ModelLoader
---

# Efficient Loader
## Documentation
- Class name: `Efficient Loader`
- Category: `Efficiency Nodes/Loaders`
- Output node: `False`

The Efficient Loader node is designed to streamline the process of loading and initializing models, VAEs, and other dependencies for generative tasks. It efficiently manages resources by selectively caching and reusing components, and supports customization through parameters like checkpoint names, LoRA configurations, and batch sizes. This node aims to optimize the setup phase for generative workflows, reducing overhead and facilitating quicker iterations.
## Input types
### Required
- **`ckpt_name`**
    - Specifies the checkpoint name for the model to be loaded, serving as a key identifier for retrieving model parameters and configurations.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`vae_name`**
    - Identifies the VAE to be used in the generative process, crucial for defining the visual encoding and decoding mechanisms.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`clip_skip`**
    - Specifies the intervals at which CLIP layers are skipped, optimizing the model's performance for specific tasks.
    - Comfy dtype: `INT`
    - Python dtype: `tuple`
- **`lora_name`**
    - Specifies the name of the LoRA model to be loaded, if applicable, enabling dynamic adjustments to model parameters without full retraining.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`lora_model_strength`**
    - Defines the strength of the LoRA model adjustments, allowing for fine-tuning of the model's behavior.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`lora_clip_strength`**
    - Determines the strength of the CLIP adjustments when LoRA is applied, affecting the text-image alignment.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`positive`**
    - The positive conditioning text, guiding the generative model towards desired attributes in the output.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`negative`**
    - The negative conditioning text, instructing the generative model to avoid certain attributes in the output.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`token_normalization`**
    - Defines the method for normalizing tokens, affecting how text inputs are processed and interpreted by the model.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `list`
- **`weight_interpretation`**
    - Determines how weights are interpreted, allowing for customization of the model's learning and adaptation processes.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `list`
- **`empty_latent_width`**
    - Specifies the width of the empty latent space, setting the dimensions for the initial generative canvas.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`empty_latent_height`**
    - Specifies the height of the empty latent space, setting the dimensions for the initial generative canvas.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`batch_size`**
    - Determines the number of samples to be processed in parallel, directly impacting memory usage and computational efficiency.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`lora_stack`**
    - A stack of LoRA models to be applied, enabling complex model adjustments through multiple layers.
    - Comfy dtype: `LORA_STACK`
    - Python dtype: `list`
- **`cnet_stack`**
    - A stack of ControlNet models to be applied, facilitating advanced control over the generative process.
    - Comfy dtype: `CONTROL_NET_STACK`
    - Python dtype: `list`
## Output types
- **`MODEL`**
    - Comfy dtype: `MODEL`
    - The main model loaded and prepared for generative tasks, including any applied modifications like LoRA.
    - Python dtype: `torch.nn.Module`
- **`CONDITIONING+`**
    - Comfy dtype: `CONDITIONING`
    - Processed positive conditioning information, ready for use in guiding the generative process.
    - Python dtype: `dict`
- **`CONDITIONING-`**
    - Comfy dtype: `CONDITIONING`
    - Processed negative conditioning information, ready for use in avoiding undesired attributes.
    - Python dtype: `dict`
- **`LATENT`**
    - Comfy dtype: `LATENT`
    - An empty latent space tensor, prepared based on specified dimensions, serving as a starting point for generation.
    - Python dtype: `torch.Tensor`
- **`VAE`**
    - Comfy dtype: `VAE`
    - The loaded VAE model, essential for encoding and decoding visual information in the generative process.
    - Python dtype: `torch.nn.Module`
- **`CLIP`**
    - Comfy dtype: `CLIP`
    - The CLIP model loaded and configured based on the specified skip intervals, facilitating text-image alignment.
    - Python dtype: `torch.nn.Module`
- **`DEPENDENCIES`**
    - Comfy dtype: `DEPENDENCIES`
    - A collection of dependencies including model names, configurations, and parameters, ensuring all necessary components are loaded.
    - Python dtype: `tuple`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [KSampler (Efficient)](../../efficiency-nodes-comfyui/Nodes/KSampler (Efficient).md)
    - [VAEDecode](../../Comfy/Nodes/VAEDecode.md)
    - [FaceDetailer](../../ComfyUI-Impact-Pack/Nodes/FaceDetailer.md)
    - [KSampler Adv. (Efficient)](../../efficiency-nodes-comfyui/Nodes/KSampler Adv. (Efficient).md)
    - [KSampler](../../Comfy/Nodes/KSampler.md)
    - [UltimateSDUpscale](../../ComfyUI_UltimateSDUpscale/Nodes/UltimateSDUpscale.md)
    - [BatchPromptSchedule](../../ComfyUI_FizzNodes/Nodes/BatchPromptSchedule.md)
    - [CLIPTextEncode](../../Comfy/Nodes/CLIPTextEncode.md)
    - [LoraLoader](../../Comfy/Nodes/LoraLoader.md)



## Source code
```python
class TSC_EfficientLoader:

    @classmethod
    def INPUT_TYPES(cls):
        return {"required": { "ckpt_name": (folder_paths.get_filename_list("checkpoints"),),
                              "vae_name": (["Baked VAE"] + folder_paths.get_filename_list("vae"),),
                              "clip_skip": ("INT", {"default": -1, "min": -24, "max": -1, "step": 1}),
                              "lora_name": (["None"] + folder_paths.get_filename_list("loras"),),
                              "lora_model_strength": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
                              "lora_clip_strength": ("FLOAT", {"default": 1.0, "min": -10.0, "max": 10.0, "step": 0.01}),
                              "positive": ("STRING", {"default": "CLIP_POSITIVE","multiline": True}),
                              "negative": ("STRING", {"default": "CLIP_NEGATIVE", "multiline": True}),
                              "token_normalization": (["none", "mean", "length", "length+mean"],),
                              "weight_interpretation": (["comfy", "A1111", "compel", "comfy++", "down_weight"],),
                              "empty_latent_width": ("INT", {"default": 512, "min": 64, "max": MAX_RESOLUTION, "step": 64}),
                              "empty_latent_height": ("INT", {"default": 512, "min": 64, "max": MAX_RESOLUTION, "step": 64}),
                              "batch_size": ("INT", {"default": 1, "min": 1, "max": 262144})},
                "optional": {"lora_stack": ("LORA_STACK", ),
                             "cnet_stack": ("CONTROL_NET_STACK",)},
                "hidden": { "prompt": "PROMPT",
                            "my_unique_id": "UNIQUE_ID",},
                }

    RETURN_TYPES = ("MODEL", "CONDITIONING", "CONDITIONING", "LATENT", "VAE", "CLIP", "DEPENDENCIES",)
    RETURN_NAMES = ("MODEL", "CONDITIONING+", "CONDITIONING-", "LATENT", "VAE", "CLIP", "DEPENDENCIES", )
    FUNCTION = "efficientloader"
    CATEGORY = "Efficiency Nodes/Loaders"

    def efficientloader(self, ckpt_name, vae_name, clip_skip, lora_name, lora_model_strength, lora_clip_strength,
                        positive, negative, token_normalization, weight_interpretation, empty_latent_width,
                        empty_latent_height, batch_size, lora_stack=None, cnet_stack=None, refiner_name="None",
                        ascore=None, prompt=None, my_unique_id=None, loader_type="regular"):

        # Clean globally stored objects
        globals_cleanup(prompt)

        # Create Empty Latent
        latent = torch.zeros([batch_size, 4, empty_latent_height // 8, empty_latent_width // 8]).cpu()

        # Retrieve cache numbers
        vae_cache, ckpt_cache, lora_cache, refn_cache = get_cache_numbers("Efficient Loader")

        if lora_name != "None" or lora_stack:
            # Initialize an empty list to store LoRa parameters.
            lora_params = []

            # Check if lora_name is not the string "None" and if so, add its parameters.
            if lora_name != "None":
                lora_params.append((lora_name, lora_model_strength, lora_clip_strength))

            # If lora_stack is not None or an empty list, extend lora_params with its items.
            if lora_stack:
                lora_params.extend(lora_stack)

            # Load LoRa(s)
            model, clip = load_lora(lora_params, ckpt_name, my_unique_id, cache=lora_cache, ckpt_cache=ckpt_cache, cache_overwrite=True)

            if vae_name == "Baked VAE":
                vae = get_bvae_by_ckpt_name(ckpt_name)
        else:
            model, clip, vae = load_checkpoint(ckpt_name, my_unique_id, cache=ckpt_cache, cache_overwrite=True)
            lora_params = None

        # Load Refiner Checkpoint if given
        if refiner_name != "None":
            refiner_model, refiner_clip, _ = load_checkpoint(refiner_name, my_unique_id, output_vae=False,
                                                             cache=refn_cache, cache_overwrite=True, ckpt_type="refn")
        else:
            refiner_model = refiner_clip = None

        # Extract clip_skips
        refiner_clip_skip = clip_skip[1] if loader_type == "sdxl" else None
        clip_skip = clip_skip[0] if loader_type == "sdxl" else clip_skip

        # Encode prompt based on loader_type
        positive_encoded, negative_encoded, clip, refiner_positive_encoded, refiner_negative_encoded, refiner_clip = \
            encode_prompts(positive, negative, token_normalization, weight_interpretation, clip, clip_skip,
                           refiner_clip, refiner_clip_skip, ascore, loader_type == "sdxl",
                           empty_latent_width, empty_latent_height)

        # Apply ControlNet Stack if given
        if cnet_stack:
            controlnet_conditioning = TSC_Apply_ControlNet_Stack().apply_cnet_stack(positive_encoded, negative_encoded, cnet_stack)
            positive_encoded, negative_encoded = controlnet_conditioning[0], controlnet_conditioning[1]

        # Check for custom VAE
        if vae_name != "Baked VAE":
            vae = load_vae(vae_name, my_unique_id, cache=vae_cache, cache_overwrite=True)

        # Data for XY Plot
        dependencies = (vae_name, ckpt_name, clip, clip_skip, refiner_name, refiner_clip, refiner_clip_skip,
                        positive, negative, token_normalization, weight_interpretation, ascore,
                        empty_latent_width, empty_latent_height, lora_params, cnet_stack)

        ### Debugging
        ###print_loaded_objects_entries()
        print_loaded_objects_entries(my_unique_id, prompt)

        if loader_type == "regular":
            return (model, positive_encoded, negative_encoded, {"samples":latent}, vae, clip, dependencies,)
        elif loader_type == "sdxl":
            return ((model, clip, positive_encoded, negative_encoded, refiner_model, refiner_clip,
                     refiner_positive_encoded, refiner_negative_encoded), {"samples":latent}, vae, dependencies,)

```
