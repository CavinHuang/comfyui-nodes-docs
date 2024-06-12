---
tags:
- Sampling
---

# KSampler (Efficient)
## Documentation
- Class name: `KSampler (Efficient)`
- Category: `Efficiency Nodes/Sampling`
- Output node: `True`

The KSampler (Efficient) node is designed to efficiently sample latent images using a variety of sampling techniques, tailored to work with specific model configurations and conditioning parameters. It leverages the Comfy KSampler nodes to generate or refine latent images based on provided seeds, steps, and other relevant parameters, optimizing the process for performance without compromising on the quality of the generated images.
## Input types
### Required
- **`model`**
    - Specifies the model to be used for sampling, playing a crucial role in determining the characteristics and quality of the generated latent images.
    - Comfy dtype: `MODEL`
    - Python dtype: `torch.nn.Module`
- **`seed`**
    - A seed value to ensure reproducibility of the sampling process, affecting the randomness and variation in the generated images.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`steps`**
    - Defines the number of steps to be taken in the sampling process, impacting the detail and quality of the output images.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`cfg`**
    - A configuration parameter that adjusts the sampling process, influencing the generation's creativity and fidelity.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`sampler_name`**
    - Identifies the specific sampling algorithm to be used, affecting the approach and technique for generating latent images.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`scheduler`**
    - Specifies the scheduler for the sampling process, controlling the progression of steps and their impact on image quality.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`positive`**
    - Positive conditioning text to guide the image generation towards desired attributes or themes.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`negative`**
    - Negative conditioning text to steer the image generation away from certain attributes or themes.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`latent_image`**
    - An initial latent image to be refined or modified through the sampling process, serving as a starting point for generation.
    - Comfy dtype: `LATENT`
    - Python dtype: `torch.Tensor`
- **`denoise`**
    - A parameter to control the denoising level in the sampling process, affecting the clarity and sharpness of the generated images.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`preview_method`**
    - Specifies the method used for previewing the sampling process, influencing how intermediate or final results are visualized.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`vae_decode`**
    - Indicates whether to decode the latent image using a VAE model, affecting the final image representation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
### Optional
- **`optional_vae`**
    - An optional VAE model that can be used for decoding, providing flexibility in the image generation process.
    - Comfy dtype: `VAE`
    - Python dtype: `torch.nn.Module or None`
- **`script`**
    - An optional script to customize or extend the sampling process, allowing for advanced manipulation of the generation.
    - Comfy dtype: `SCRIPT`
    - Python dtype: `str`
## Output types
- **`MODEL`**
    - Comfy dtype: `MODEL`
    - The model used in the sampling process, potentially modified or updated.
    - Python dtype: `torch.nn.Module`
- **`CONDITIONING+`**
    - Comfy dtype: `CONDITIONING`
    - The positive conditioning information used or generated during the sampling process.
    - Python dtype: `str`
- **`CONDITIONING-`**
    - Comfy dtype: `CONDITIONING`
    - The negative conditioning information used or generated during the sampling process.
    - Python dtype: `str`
- **`LATENT`**
    - Comfy dtype: `LATENT`
    - The output latent image(s) generated or refined by the sampling process, ready for further processing or conversion into visible images.
    - Python dtype: `torch.Tensor`
- **`VAE`**
    - Comfy dtype: `VAE`
    - The VAE model used or referenced in the sampling process, if applicable.
    - Python dtype: `torch.nn.Module`
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - The final or intermediate images generated during the sampling process, as determined by the preview method and other parameters.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [KSampler (Efficient)](../../efficiency-nodes-comfyui/Nodes/KSampler (Efficient).md)
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)
    - [ImageUpscaleWithModel](../../Comfy/Nodes/ImageUpscaleWithModel.md)
    - [VAEDecode](../../Comfy/Nodes/VAEDecode.md)
    - [UltimateSDUpscale](../../ComfyUI_UltimateSDUpscale/Nodes/UltimateSDUpscale.md)
    - [CR Simple Meme Template](../../ComfyUI_Comfyroll_CustomNodes/Nodes/CR Simple Meme Template.md)
    - NNLatentUpscale
    - [LatentUpscaleBy](../../Comfy/Nodes/LatentUpscaleBy.md)
    - [ReActorFaceSwap](../../comfyui-reactor-node/Nodes/ReActorFaceSwap.md)
    - [VHS_VideoCombine](../../ComfyUI-VideoHelperSuite/Nodes/VHS_VideoCombine.md)



## Source code
```python
class TSC_KSampler:
    
    empty_image = pil2tensor(Image.new('RGBA', (1, 1), (0, 0, 0, 0)))

    @classmethod
    def INPUT_TYPES(cls):
        return {"required":
                    {"model": ("MODEL",),
                     "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                     "steps": ("INT", {"default": 20, "min": 1, "max": 10000}),
                     "cfg": ("FLOAT", {"default": 7.0, "min": 0.0, "max": 100.0}),
                     "sampler_name": (comfy.samplers.KSampler.SAMPLERS,),
                     "scheduler": (comfy.samplers.KSampler.SCHEDULERS,),
                     "positive": ("CONDITIONING",),
                     "negative": ("CONDITIONING",),
                     "latent_image": ("LATENT",),
                     "denoise": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 1.0, "step": 0.01}),
                     "preview_method": (["auto", "latent2rgb", "taesd", "vae_decoded_only", "none"],),
                     "vae_decode": (["true", "true (tiled)", "false"],),
                     },
                "optional": { "optional_vae": ("VAE",),
                              "script": ("SCRIPT",),},
                "hidden": {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO", "my_unique_id": "UNIQUE_ID",},
                }

    RETURN_TYPES = ("MODEL", "CONDITIONING", "CONDITIONING", "LATENT", "VAE", "IMAGE", )
    RETURN_NAMES = ("MODEL", "CONDITIONING+", "CONDITIONING-", "LATENT", "VAE", "IMAGE", )
    OUTPUT_NODE = True
    FUNCTION = "sample"
    CATEGORY = "Efficiency Nodes/Sampling"

    def sample(self, model, seed, steps, cfg, sampler_name, scheduler, positive, negative, latent_image,
               preview_method, vae_decode, denoise=1.0, prompt=None, extra_pnginfo=None, my_unique_id=None,
               optional_vae=(None,), script=None, add_noise=None, start_at_step=None, end_at_step=None,
               return_with_leftover_noise=None, sampler_type="regular"):

        # Rename the vae variable
        vae = optional_vae

        # If vae is not connected, disable vae decoding
        if vae == (None,) and vae_decode != "false":
            print(f"{warning('KSampler(Efficient) Warning:')} No vae input detected, proceeding as if vae_decode was false.\n")
            vae_decode = "false"

        #---------------------------------------------------------------------------------------------------------------
        # Unpack SDXL Tuple embedded in the 'model' channel
        if sampler_type == "sdxl":
            sdxl_tuple = model
            model, _, positive, negative, refiner_model, _, refiner_positive, refiner_negative = sdxl_tuple
        else:
            refiner_model = refiner_positive = refiner_negative = None

        #---------------------------------------------------------------------------------------------------------------
        def keys_exist_in_script(*keys):
            return any(key in script for key in keys) if script else False

        #---------------------------------------------------------------------------------------------------------------
        def vae_decode_latent(vae, samples, vae_decode):
            return VAEDecodeTiled().decode(vae,samples,320)[0] if "tiled" in vae_decode else VAEDecode().decode(vae,samples)[0]

        def vae_encode_image(vae, pixels, vae_decode):
            return VAEEncodeTiled().encode(vae,pixels,320)[0] if "tiled" in vae_decode else VAEEncode().encode(vae,pixels)[0]

        # ---------------------------------------------------------------------------------------------------------------
        def process_latent_image(model, seed, steps, cfg, sampler_name, scheduler, positive, negative, latent_image,
                                denoise, sampler_type, add_noise, start_at_step, end_at_step, return_with_leftover_noise,
                                refiner_model, refiner_positive, refiner_negative, vae, vae_decode, preview_method):

            # Store originals
            previous_preview_method = global_preview_method()
            original_prepare_noise = comfy.sample.prepare_noise
            original_KSampler = comfy.samplers.KSampler
            original_model_str = str(model)

            # Initialize output variables
            samples = images = gifs = preview = cnet_imgs = None

            try:
                # Change the global preview method (temporarily)
                set_preview_method(preview_method)

                # ------------------------------------------------------------------------------------------------------
                # Check if "noise" exists in the script before main sampling has taken place
                if keys_exist_in_script("noise"):
                    rng_source, cfg_denoiser, add_seed_noise, m_seed, m_weight = script["noise"]
                    smZ_rng_source.rng_rand_source(rng_source) # this function monkey patches comfy.sample.prepare_noise
                    if cfg_denoiser:
                        comfy.samplers.KSampler = smZ_cfg_denoiser.SDKSampler
                    if add_seed_noise:
                        comfy.sample.prepare_noise = cg_mixed_seed_noise.get_mixed_noise_function(comfy.sample.prepare_noise, m_seed, m_weight)
                    else:
                        m_seed = m_weight = None
                else:
                    rng_source = cfg_denoiser = add_seed_noise = m_seed = m_weight = None

                # ------------------------------------------------------------------------------------------------------
                # Check if "anim" exists in the script before main sampling has taken place
                if keys_exist_in_script("anim"):
                    if preview_method != "none":
                        set_preview_method("none")  # disable preview method
                        print(f"{warning('KSampler(Efficient) Warning:')} Live preview disabled for animatediff generations.")
                    motion_model, beta_schedule, context_options, frame_rate, loop_count, format, pingpong, save_image = script["anim"]
                    model = AnimateDiffLoaderWithContext().load_mm_and_inject_params(model, motion_model, beta_schedule, context_options)[0]

                # ------------------------------------------------------------------------------------------------------
                # Store run parameters as strings. Load previous stored samples if all parameters match.
                latent_image_hash = tensor_to_hash(latent_image["samples"])
                positive_hash = tensor_to_hash(positive[0][0])
                negative_hash = tensor_to_hash(negative[0][0])
                refiner_positive_hash = tensor_to_hash(refiner_positive[0][0]) if refiner_positive is not None else None
                refiner_negative_hash = tensor_to_hash(refiner_negative[0][0]) if refiner_negative is not None else None

                # Include motion_model, beta_schedule, and context_options as unique identifiers if they exist.
                model_identifier = [original_model_str, motion_model, beta_schedule, context_options] if keys_exist_in_script("anim")\
                                    else [original_model_str]

                parameters = [model_identifier] + [seed, steps, cfg, sampler_name, scheduler, positive_hash, negative_hash,
                                                  latent_image_hash, denoise, sampler_type, add_noise, start_at_step,
                                                  end_at_step, return_with_leftover_noise, refiner_model, refiner_positive_hash,
                                                  refiner_negative_hash, rng_source, cfg_denoiser, add_seed_noise, m_seed, m_weight]

                # Convert all elements in parameters to strings, except for the hash variable checks
                parameters = [str(item) if not isinstance(item, type(latent_image_hash)) else item for item in parameters]

                # Load previous latent if all parameters match, else returns 'None'
                samples = load_ksampler_results("latent", my_unique_id, parameters)

                if samples is None: # clear stored images
                    store_ksampler_results("image", my_unique_id, None)
                    store_ksampler_results("cnet_img", my_unique_id, None)

                if samples is not None: # do not re-sample
                    images = load_ksampler_results("image", my_unique_id)
                    cnet_imgs = True # "True" will denote that it can be loaded provided the preprocessor matches

                # Sample the latent_image(s) using the Comfy KSampler nodes
                elif sampler_type == "regular":
                    samples = KSampler().sample(model, seed, steps, cfg, sampler_name, scheduler, positive, negative,
                                                        latent_image, denoise=denoise)[0] if denoise>0 else latent_image

                elif sampler_type == "advanced":
                    samples = KSamplerAdvanced().sample(model, add_noise, seed, steps, cfg, sampler_name, scheduler,
                                                        positive, negative, latent_image, start_at_step, end_at_step,
                                                        return_with_leftover_noise, denoise=1.0)[0]

                elif sampler_type == "sdxl":
                    # Disable refiner if refine_at_step is -1
                    if end_at_step == -1:
                        end_at_step = steps

                    # Perform base model sampling
                    add_noise = return_with_leftover_noise = "enable"
                    samples = KSamplerAdvanced().sample(model, add_noise, seed, steps, cfg, sampler_name, scheduler,
                                                        positive, negative, latent_image, start_at_step, end_at_step,
                                                        return_with_leftover_noise, denoise=1.0)[0]

                    # Perform refiner model sampling
                    if refiner_model and end_at_step < steps:
                        add_noise = return_with_leftover_noise = "disable"
                        samples = KSamplerAdvanced().sample(refiner_model, add_noise, seed, steps, cfg + REFINER_CFG_OFFSET,
                                                            sampler_name, scheduler, refiner_positive, refiner_negative,
                                                            samples, end_at_step, steps,
                                                            return_with_leftover_noise, denoise=1.0)[0]

                # Cache the first pass samples in the 'last_helds' dictionary "latent" if not xyplot
                if not any(keys_exist_in_script(key) for key in ["xyplot"]):
                    store_ksampler_results("latent", my_unique_id, samples, parameters)

                # ------------------------------------------------------------------------------------------------------
                # Check if "hiresfix" exists in the script after main sampling has taken place
                if keys_exist_in_script("hiresfix"):
                    # Unpack the tuple from the script's "hiresfix" key
                    upscale_type, latent_upscaler, upscale_by, use_same_seed, hires_seed, hires_steps, hires_denoise,\
                        iterations, hires_control_net, hires_cnet_strength, preprocessor, preprocessor_imgs, \
                        latent_upscale_function, latent_upscale_model, pixel_upscale_model = script["hiresfix"]

                    # Define hires_seed
                    hires_seed = seed if use_same_seed else hires_seed

                    # Define latent_upscale_model
                    if latent_upscale_model is None:
                        latent_upscale_model = model
                    elif keys_exist_in_script("anim"):
                            latent_upscale_model = \
                            AnimateDiffLoaderWithContext().load_mm_and_inject_params(latent_upscale_model, motion_model,
                                                                                     beta_schedule, context_options)[0]

                    # Generate Preprocessor images and Apply Control Net
                    if hires_control_net is not None:
                        # Attempt to load previous "cnet_imgs" if previous images were loaded and preprocessor is same
                        if cnet_imgs is True:
                            cnet_imgs = load_ksampler_results("cnet_img", my_unique_id, [preprocessor])
                        # If cnet_imgs is None, generate new ones
                        if cnet_imgs is None:
                            if images is None:
                                images = vae_decode_latent(vae, samples, vae_decode)
                                store_ksampler_results("image", my_unique_id, images)
                            cnet_imgs = AIO_Preprocessor().execute(preprocessor, images)[0]
                            store_ksampler_results("cnet_img", my_unique_id, cnet_imgs, [preprocessor])
                        positive = ControlNetApply().apply_controlnet(positive, hires_control_net, cnet_imgs, hires_cnet_strength)[0]
                        
                    # Iterate for the given number of iterations
                    if upscale_type == "latent":
                        for _ in range(iterations):
                            upscaled_latent_image = latent_upscale_function().upscale(samples, latent_upscaler, upscale_by)[0]
                            samples = KSampler().sample(latent_upscale_model, hires_seed, hires_steps, cfg, sampler_name, scheduler,
                                                            positive, negative, upscaled_latent_image, denoise=hires_denoise)[0]
                            images = None # set to None when samples is updated
                    elif upscale_type == "pixel":
                        if images is None:
                            images = vae_decode_latent(vae, samples, vae_decode)
                            store_ksampler_results("image", my_unique_id, images)
                        images = ImageUpscaleWithModel().upscale(pixel_upscale_model, images)[0]
                        images = ImageScaleBy().upscale(images, "nearest-exact", upscale_by/4)[0]
                    elif upscale_type == "both":
                        for _ in range(iterations):
                            if images is None:
                                images = vae_decode_latent(vae, samples, vae_decode)
                                store_ksampler_results("image", my_unique_id, images)
                            images = ImageUpscaleWithModel().upscale(pixel_upscale_model, images)[0]
                            images = ImageScaleBy().upscale(images, "nearest-exact", upscale_by/4)[0]

                            samples = vae_encode_image(vae, images, vae_decode)
                            upscaled_latent_image = latent_upscale_function().upscale(samples, latent_upscaler, 1)[0]
                            samples = KSampler().sample(latent_upscale_model, hires_seed, hires_steps, cfg, sampler_name, scheduler,
                                                                positive, negative, upscaled_latent_image, denoise=hires_denoise)[0]
                            images = None # set to None when samples is updated

                # ------------------------------------------------------------------------------------------------------
                # Check if "tile" exists in the script after main sampling has taken place
                if keys_exist_in_script("tile"):
                    # Unpack the tuple from the script's "tile" key
                    upscale_by, tile_size, tiling_strategy, tiling_steps, tile_seed, tiled_denoise,\
                        tile_controlnet, strength = script["tile"]

                    # Decode image, store if first decode
                    if images is None:
                        images = vae_decode_latent(vae, samples, vae_decode)
                        if not any(keys_exist_in_script(key) for key in ["xyplot", "hiresfix"]):
                            store_ksampler_results("image", my_unique_id, images)

                    # Upscale image
                    upscaled_image = ImageScaleBy().upscale(images, "nearest-exact", upscale_by)[0]
                    upscaled_latent = vae_encode_image(vae, upscaled_image, vae_decode)

                    # If using Control Net, Apply Control Net using upscaled_image and loaded control_net
                    if tile_controlnet is not None:
                        positive = ControlNetApply().apply_controlnet(positive, tile_controlnet, upscaled_image, 1)[0]

                    # Sample latent
                    TSampler = bnk_tiled_samplers.TiledKSampler
                    samples = TSampler().sample(model, tile_seed, tile_size, tile_size, tiling_strategy, tiling_steps, cfg,
                                                sampler_name, scheduler, positive, negative, upscaled_latent,
                                                denoise=tiled_denoise)[0]
                    images = None  # set to None when samples is updated

                # ------------------------------------------------------------------------------------------------------
                # Check if "anim" exists in the script after the main sampling has taken place
                if keys_exist_in_script("anim"):
                    if images is None:
                        images = vae_decode_latent(vae, samples, vae_decode)
                        if not any(keys_exist_in_script(key) for key in ["xyplot", "hiresfix", "tile"]):
                            store_ksampler_results("image", my_unique_id, images)
                    gifs = AnimateDiffCombine().generate_gif(images, frame_rate, loop_count, format=format,
                    pingpong=pingpong, save_image=save_image, prompt=prompt, extra_pnginfo=extra_pnginfo)["ui"]["gifs"]

                # ------------------------------------------------------------------------------------------------------

                # Decode image if not yet decoded
                if "true" in vae_decode:
                    if images is None:
                        images = vae_decode_latent(vae, samples, vae_decode)
                        # Store decoded image as base image of no script is detected
                        if all(not keys_exist_in_script(key) for key in ["xyplot", "hiresfix", "tile", "anim"]):
                            store_ksampler_results("image", my_unique_id, images)

                # Append Control Net Images (if exist)
                if cnet_imgs is not None and not True:
                    if preprocessor_imgs and upscale_type == "latent":
                        if keys_exist_in_script("xyplot"):
                            print(
                                f"{warning('HighRes-Fix Warning:')} Preprocessor images auto-disabled when XY Plotting.")
                        else:
                            # Resize cnet_imgs if necessary and stack
                            if images.shape[1:3] != cnet_imgs.shape[1:3]:  # comparing height and width
                                cnet_imgs = quick_resize(cnet_imgs, images.shape)
                            images = torch.cat([images, cnet_imgs], dim=0)

                # Define preview images
                if keys_exist_in_script("anim"):
                    preview = {"gifs": gifs, "images": list()}
                elif preview_method == "none" or (preview_method == "vae_decoded_only" and vae_decode == "false"):
                    preview = {"images": list()}
                elif images is not None:
                    preview = PreviewImage().save_images(images, prompt=prompt, extra_pnginfo=extra_pnginfo)["ui"]

                # Define a dummy output image
                if images is None and vae_decode == "false":
                    images = TSC_KSampler.empty_image

            finally:
                # Restore global changes
                set_preview_method(previous_preview_method)
                comfy.samplers.KSampler = original_KSampler
                comfy.sample.prepare_noise = original_prepare_noise

            return samples, images, gifs, preview

        # ---------------------------------------------------------------------------------------------------------------
        # Clean globally stored objects of non-existant nodes
        globals_cleanup(prompt)

        # ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        # If not XY Plotting
        if not keys_exist_in_script("xyplot"):

            # Process latent image
            samples, images, gifs, preview = process_latent_image(model, seed, steps, cfg, sampler_name, scheduler,
                                            positive, negative, latent_image, denoise, sampler_type, add_noise,
                                            start_at_step, end_at_step, return_with_leftover_noise, refiner_model,
                                            refiner_positive, refiner_negative, vae, vae_decode, preview_method)

            if sampler_type == "sdxl":
                result = (sdxl_tuple, samples, vae, images,)
            else:
                result = (model, positive, negative, samples, vae, images,)
                
            if preview is None:
                return {"result": result}
            else:
                return {"ui": preview, "result": result}

        # ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        # If XY Plot
        elif keys_exist_in_script("xyplot"):

            # If no vae connected, throw errors
            if vae == (None,):
                print(f"{error('KSampler(Efficient) Error:')} VAE input must be connected in order to use the XY Plot script.")

                return {"ui": {"images": list()},
                        "result": (model, positive, negative, latent_image, vae, TSC_KSampler.empty_image,)}

            # If vae_decode is not set to true, print message that changing it to true
            if "true" not in vae_decode:
                print(f"{warning('KSampler(Efficient) Warning:')} VAE decoding must be set to \'true\'"
                    " for the XY Plot script, proceeding as if \'true\'.\n")

            #___________________________________________________________________________________________________________
            # Initialize, unpack, and clean variables for the XY Plot script
            vae_name = None
            ckpt_name = None
            clip = None
            clip_skip = None
            refiner_name = None
            refiner_clip = None
            refiner_clip_skip = None
            positive_prompt = None
            negative_prompt = None
            ascore = None
            empty_latent_width = None
            empty_latent_height = None
            lora_stack = None
            cnet_stack = None

            # Split the 'samples' tensor
            samples_tensors = torch.split(latent_image['samples'], 1, dim=0)

            # Check if 'noise_mask' exists and split if it does
            if 'noise_mask' in latent_image:
                noise_mask_tensors = torch.split(latent_image['noise_mask'], 1, dim=0)
                latent_tensors = [{'samples': img, 'noise_mask': mask} for img, mask in
                                  zip(samples_tensors, noise_mask_tensors)]
            else:
                latent_tensors = [{'samples': img} for img in samples_tensors]

            # Set latent only to the first of the batch
            latent_image = latent_tensors[0]

            # Unpack script Tuple (X_type, X_value, Y_type, Y_value, grid_spacing, Y_label_orientation, dependencies)
            X_type, X_value, Y_type, Y_value, grid_spacing, Y_label_orientation, cache_models, xyplot_as_output_image,\
                xyplot_id, dependencies = script["xyplot"]

            #_______________________________________________________________________________________________________
            # The below section is used to check wether the XY_type is allowed for the Ksampler instance being used.
            # If not the correct type, this section will abort the xy plot script.

            samplers = {
                "regular": {
                    "disallowed": ["AddNoise", "ReturnNoise", "StartStep", "EndStep", "RefineStep",
                                   "Refiner", "Refiner On/Off", "AScore+", "AScore-"],
                    "name": "KSampler (Efficient)"
                },
                "advanced": {
                    "disallowed": ["RefineStep", "Denoise", "RefineStep", "Refiner", "Refiner On/Off",
                                   "AScore+", "AScore-"],
                    "name": "KSampler Adv. (Efficient)"
                },
                "sdxl": {
                    "disallowed": ["AddNoise", "EndStep", "Denoise"],
                    "name": "KSampler SDXL (Eff.)"
                }
            }

            # Define disallowed XY_types for each ksampler type
            def get_ksampler_details(sampler_type):
                return samplers.get(sampler_type, {"disallowed": [], "name": ""})

            def suggest_ksampler(X_type, Y_type, current_sampler):
                for sampler, details in samplers.items():
                    if sampler != current_sampler and X_type not in details["disallowed"] and Y_type not in details["disallowed"]:
                        return details["name"]
                return "a different KSampler"

            # In your main function or code segment:
            details = get_ksampler_details(sampler_type)
            disallowed_XY_types = details["disallowed"]
            ksampler_name = details["name"]

            if X_type in disallowed_XY_types or Y_type in disallowed_XY_types:
                error_prefix = f"{error(f'{ksampler_name} Error:')}"

                failed_type = []
                if X_type in disallowed_XY_types:
                    failed_type.append(f"X_type: '{X_type}'")
                if Y_type in disallowed_XY_types:
                    failed_type.append(f"Y_type: '{Y_type}'")

                suggested_ksampler = suggest_ksampler(X_type, Y_type, sampler_type)

                print(f"{error_prefix} Invalid value for {' and '.join(failed_type)}. "
                    f"Use {suggested_ksampler} for this XY Plot type."
                    f"\nDisallowed XY_types for this KSampler are: {', '.join(disallowed_XY_types)}.")

                return {"ui": {"images": list()},
                    "result": (model, positive, negative, latent_image, vae, TSC_KSampler.empty_image,)}

            #_______________________________________________________________________________________________________
            # Unpack Effficient Loader dependencies
            if dependencies is not None:
                vae_name, ckpt_name, clip, clip_skip, refiner_name, refiner_clip, refiner_clip_skip,\
                    positive_prompt, negative_prompt, token_normalization, weight_interpretation, ascore,\
                    empty_latent_width, empty_latent_height, lora_stack, cnet_stack = dependencies

            #_______________________________________________________________________________________________________
            # Printout XY Plot values to be processed
            def process_xy_for_print(value, replacement, type_):

                if type_ == "Seeds++ Batch" and isinstance(value, list):
                    return [v + seed for v in value]  # Add seed to every entry in the list

                elif type_ == "Scheduler" and isinstance(value, tuple):
                    return value[0]  # Return only the first entry of the tuple

                elif type_ == "VAE" and isinstance(value, list):
                    # For each string in the list, extract the filename from the path
                    return [os.path.basename(v) for v in value]

                elif (type_ == "Checkpoint" or type_ == "Refiner") and isinstance(value, list):
                    # For each tuple in the list, return only the first value if the second or third value is None
                    return [(os.path.basename(v[0]),) + v[1:] if v[1] is None or v[2] is None
                            else (os.path.basename(v[0]), v[1]) if v[2] is None
                            else (os.path.basename(v[0]),) + v[1:] for v in value]

                elif type_ == "LoRA" and isinstance(value, list):
                    # Return only the first Tuple of each inner array
                    return [[(os.path.basename(v[0][0]),) + v[0][1:], "..."] if len(v) > 1
                            else [(os.path.basename(v[0][0]),) + v[0][1:]] for v in value]

                elif type_ == "LoRA Batch" and isinstance(value, list):
                    # Extract the basename of the first value of the first tuple from each sublist
                    return [os.path.basename(v[0][0]) for v in value if v and isinstance(v[0], tuple) and v[0][0]]

                elif (type_ == "LoRA Wt" or type_ == "LoRA MStr") and isinstance(value, list):
                    # Extract the first value of the first tuple from each sublist
                    return [v[0][1] for v in value if v and isinstance(v[0], tuple)]

                elif type_ == "LoRA CStr" and isinstance(value, list):
                    # Extract the first value of the first tuple from each sublist
                    return [v[0][2] for v in value if v and isinstance(v[0], tuple)]

                elif type_ == "ControlNetStrength" and isinstance(value, list):
                    # Extract the third entry of the first tuple from each inner list
                    return [round(inner_list[0][2], 3) for inner_list in value]

                elif type_ == "ControlNetStart%" and isinstance(value, list):
                    # Extract the third entry of the first tuple from each inner list
                    return [round(inner_list[0][3], 3) for inner_list in value]

                elif type_ == "ControlNetEnd%" and isinstance(value, list):
                    # Extract the third entry of the first tuple from each inner list
                    return [round(inner_list[0][4], 3) for inner_list in value]

                elif isinstance(value, tuple):
                    return tuple(replacement if v is None else v for v in value)

                else:
                    return replacement if value is None else value

            # Determine the replacements based on X_type and Y_type
            replacement_X = scheduler if X_type == 'Sampler' else clip_skip if X_type == 'Checkpoint' else None
            replacement_Y = scheduler if Y_type == 'Sampler' else clip_skip if Y_type == 'Checkpoint' else None

            # Process X_value and Y_value
            X_value_processed = process_xy_for_print(X_value, replacement_X, X_type)
            Y_value_processed = process_xy_for_print(Y_value, replacement_Y, Y_type)

            print(info("-" * 40))
            print(info('XY Plot Script Inputs:'))
            print(info(f"(X) {X_type}:"))
            for item in X_value_processed:
                print(info(f"    {item}"))
            print(info(f"(Y) {Y_type}:"))
            for item in Y_value_processed:
                print(info(f"    {item}"))
            print(info("-" * 40))

            #_______________________________________________________________________________________________________
            # Perform various initializations in this section

            # If not caching models, set to 1.
            if cache_models == "False":
                vae_cache = ckpt_cache = lora_cache = refn_cache = 1
            else:
                # Retrieve cache numbers
                vae_cache, ckpt_cache, lora_cache, refn_cache = get_cache_numbers("XY Plot")
            # Pack cache numbers in a tuple
            cache = (vae_cache, ckpt_cache, lora_cache, refn_cache)

            # Add seed to every entry in the list
            X_value = [v + seed for v in X_value] if "Seeds++ Batch" == X_type else X_value
            Y_value = [v + seed for v in Y_value] if "Seeds++ Batch" == Y_type else Y_value

            # Embedd original prompts into prompt variables
            positive_prompt = (positive_prompt, positive_prompt)
            negative_prompt = (negative_prompt, negative_prompt)

            # Set lora_stack to None if one of types are LoRA
            if "LoRA" in X_type or "LoRA" in Y_type:
                lora_stack = None

            # Define the manipulated and static Control Net Variables with a tuple with shape (cn_1, cn_2, cn_3).
            # The information in this tuple will be used by the plotter to properly plot Control Net XY input types.
            cn_1, cn_2, cn_3 = None, None, None
            # If X_type has "ControlNet" or both X_type and Y_type have "ControlNet"
            if "ControlNet" in X_type:
                cn_1, cn_2, cn_3 = X_value[0][0][2], X_value[0][0][3], X_value[0][0][4]
            # If only Y_type has "ControlNet" and not X_type
            elif "ControlNet" in Y_type:
                cn_1, cn_2, cn_3 = Y_value[0][0][2], Y_value[0][0][3], Y_value[0][0][4]
            # Additional checks for other substrings
            if "ControlNetStrength" in X_type or "ControlNetStrength" in Y_type:
                cn_1 = None
            if "ControlNetStart%" in X_type or "ControlNetStart%" in Y_type:
                cn_2 = None
            if "ControlNetEnd%" in X_type or "ControlNetEnd%" in Y_type:
                cn_3 = None
            # Embed the information in cnet_stack
            cnet_stack = (cnet_stack, (cn_1, cn_2, cn_3))

            # Optimize image generation by prioritization:
            priority = [
                "Checkpoint",
                "Refiner",
                "LoRA",
                "VAE",
            ]
            conditioners = {
                "Positive Prompt S/R",
                "Negative Prompt S/R",
                "AScore+",
                "AScore-",
                "Clip Skip",
                "Clip Skip (Refiner)",
                "ControlNetStrength",
                "ControlNetStart%",
                "ControlNetEnd%"
            }
            # Get priority values; return a high number if the type is not in priority list
            x_priority = priority.index(X_type) if X_type in priority else 999
            y_priority = priority.index(Y_type) if Y_type in priority else 999

            # Check if both are conditioners
            are_both_conditioners = X_type in conditioners and Y_type in conditioners

            # Special cases
            is_special_case = (
                    (X_type == "Refiner On/Off" and Y_type in ["RefineStep", "Steps"]) or
                    (X_type == "Nothing" and Y_type != "Nothing")
            )

            # Determine whether to flip
            flip_xy = (y_priority < x_priority and not are_both_conditioners) or is_special_case

            # Perform the flip if necessary
            if flip_xy:
                X_type, Y_type = Y_type, X_type
                X_value, Y_value = Y_value, X_value

            #_______________________________________________________________________________________________________
            # The below code will clean from the cache any ckpt/vae/lora models it will not be reusing.
            # Note: Special LoRA types will not trigger cache: "LoRA Batch", "LoRA Wt", "LoRA MStr", "LoRA CStr"

            # Map the type names to the dictionaries
            dict_map = {"VAE": [], "Checkpoint": [], "LoRA": [], "Refiner": []}

            # Create a list of tuples with types and values
            type_value_pairs = [(X_type, X_value.copy()), (Y_type, Y_value.copy())]

            # Iterate over type-value pairs
            for t, v in type_value_pairs:
                if t in dict_map:
                    # Flatten the list of lists of tuples if the type is "LoRA"
                    if t == "LoRA":
                        dict_map[t] = [item for sublist in v for item in sublist]
                    else:
                        dict_map[t] = v

            vae_dict = dict_map.get("VAE", [])

            # Construct ckpt_dict and also update vae_dict based on the third entry of the tuples in dict_map["Checkpoint"]
            if dict_map.get("Checkpoint", []):
                ckpt_dict = [t[0] for t in dict_map["Checkpoint"]]
                for t in dict_map["Checkpoint"]:
                    if t[2] is not None and t[2] != "Baked VAE":
                        vae_dict.append(t[2])
            else:
                ckpt_dict = []

            lora_dict = [[t,] for t in dict_map.get("LoRA", [])] if dict_map.get("LoRA", []) else []

            # Construct refn_dict
            if dict_map.get("Refiner", []):
                refn_dict = [t[0] for t in dict_map["Refiner"]]
            else:
                refn_dict = []

            # If both ckpt_dict and lora_dict are not empty, manipulate lora_dict as described
            if ckpt_dict and lora_dict:
                lora_dict = [(lora_stack, ckpt) for ckpt in ckpt_dict for lora_stack in lora_dict]
            # If lora_dict is not empty and ckpt_dict is empty, insert ckpt_name into each tuple in lora_dict
            elif lora_dict:
                lora_dict = [(lora_stack, ckpt_name) for lora_stack in lora_dict]

            # Avoid caching models accross both X and Y
            if X_type == "Checkpoint":
                lora_dict = []
                refn_dict = []
            elif X_type == "Refiner":
                ckpt_dict = []
                lora_dict = []
            elif X_type == "LoRA":
                ckpt_dict = []
                refn_dict = []

            ### Print dict_arrays for debugging
            ###print(f"vae_dict={vae_dict}\nckpt_dict={ckpt_dict}\nlora_dict={lora_dict}\nrefn_dict={refn_dict}")

            # Clean values that won't be reused
            clear_cache_by_exception(xyplot_id, vae_dict=vae_dict, ckpt_dict=ckpt_dict, lora_dict=lora_dict, refn_dict=refn_dict)

            ### Print loaded_objects for debugging
            ###print_loaded_objects_entries()

            #_______________________________________________________________________________________________________
            # Function that changes appropiate variables for next processed generations (also generates XY_labels)
            def define_variable(var_type, var, add_noise, seed, steps, start_at_step, end_at_step,
                                return_with_leftover_noise, cfg, sampler_name, scheduler, denoise, vae_name, ckpt_name,
                                clip_skip, refiner_name, refiner_clip_skip, positive_prompt, negative_prompt, ascore,
                                lora_stack, cnet_stack, var_label, num_label):

                # Define default max label size limit
                max_label_len = 42

                # If var_type is "AddNoise", update 'add_noise' with 'var', and generate text label
                if var_type == "AddNoise":
                    add_noise = var
                    text = f"AddNoise: {add_noise}"

                # If var_type is "Seeds++ Batch", generate text label
                elif var_type == "Seeds++ Batch":
                    seed = var
                    text = f"Seed: {seed}"

                # If var_type is "Steps", update 'steps' with 'var' and generate text label
                elif var_type == "Steps":
                    steps = var
                    text = f"Steps: {steps}"

                # If var_type is "StartStep", update 'start_at_step' with 'var' and generate text label
                elif var_type == "StartStep":
                    start_at_step = var
                    text = f"StartStep: {start_at_step}"

                # If var_type is "EndStep", update 'end_at_step' with 'var' and generate text label
                elif var_type == "EndStep":
                    end_at_step = var
                    text = f"EndStep: {end_at_step}"

                # If var_type is "RefineStep", update 'end_at_step' with 'var' and generate text label
                elif var_type == "RefineStep":
                    end_at_step = var
                    text = f"RefineStep: {end_at_step}"

                # If var_type is "ReturnNoise", update 'return_with_leftover_noise' with 'var', and generate text label
                elif var_type == "ReturnNoise":
                    return_with_leftover_noise = var
                    text = f"ReturnNoise: {return_with_leftover_noise}"

                # If var_type is "CFG Scale", update cfg with var and generate text label
                elif var_type == "CFG Scale":
                    cfg = var
                    text = f"CFG: {round(cfg,2)}"

                # If var_type is "Sampler", update sampler_name and scheduler with var, and generate text label
                elif var_type == "Sampler":
                    sampler_name = var[0]
                    if var[1] == "":
                        text = f"{sampler_name}"
                    else:
                        if var[1] != None:
                            scheduler = (var[1], scheduler[1])
                        else:
                            scheduler = (scheduler[1], scheduler[1])
                        text = f"{sampler_name} ({scheduler[0]})"
                    text = text.replace("ancestral", "a").replace("uniform", "u").replace("exponential","exp")

                # If var_type is "Scheduler", update scheduler and generate labels
                elif var_type == "Scheduler":
                    if len(var) == 2:
                        scheduler = (var[0], scheduler[1])
                        text = f"{sampler_name} ({scheduler[0]})"
                    else:
                        scheduler = (var, scheduler[1])
                        text = f"{scheduler[0]}"
                    text = text.replace("ancestral", "a").replace("uniform", "u").replace("exponential","exp")

                # If var_type is "Denoise", update denoise and generate labels
                elif var_type == "Denoise":
                    denoise = var
                    text = f"Denoise: {round(denoise, 2)}"

                # If var_type is "VAE", update vae_name and generate labels
                elif var_type == "VAE":
                    vae_name = var
                    vae_filename = os.path.splitext(os.path.basename(vae_name))[0]
                    text = f"VAE: {vae_filename}"

                # If var_type is "Positive Prompt S/R", update positive_prompt and generate labels
                elif var_type == "Positive Prompt S/R":
                    search_txt, replace_txt = var
                    if replace_txt != None:
                        # check if we are in the Y loop after the X loop
                        if positive_prompt[2] is not None:
                            positive_prompt = (positive_prompt[2].replace(search_txt, replace_txt, 1), positive_prompt[1], positive_prompt[2])
                        else:
                            positive_prompt = (positive_prompt[1].replace(search_txt, replace_txt, 1), positive_prompt[1], positive_prompt[1].replace(search_txt, replace_txt, 1))
                    else:
                        if positive_prompt[2] is not None:
                            positive_prompt = (positive_prompt[2], positive_prompt[1], positive_prompt[2])
                        else:
                            positive_prompt = (positive_prompt[1], positive_prompt[1], positive_prompt[1])
                        replace_txt = search_txt
                    text = f"{replace_txt}"

                # If var_type is "Negative Prompt S/R", update negative_prompt and generate labels
                elif var_type == "Negative Prompt S/R":
                    search_txt, replace_txt = var
                    if replace_txt != None:
                        # check if we are in the Y loop after the X loop
                        if negative_prompt[2] is not None:
                            negative_prompt = (negative_prompt[2].replace(search_txt, replace_txt, 1), negative_prompt[1], negative_prompt[2])
                        else:
                            negative_prompt = (negative_prompt[1].replace(search_txt, replace_txt, 1), negative_prompt[1], negative_prompt[1].replace(search_txt, replace_txt, 1))
                    else:
                        if negative_prompt[2] is not None:
                            negative_prompt = (negative_prompt[2], negative_prompt[1], negative_prompt[2])
                        else:
                            negative_prompt = (negative_prompt[1], negative_prompt[1], negative_prompt[1])
                        replace_txt = search_txt
                    text = f"(-) {replace_txt}"

                # If var_type is "AScore+", update positive ascore and generate labels
                elif var_type == "AScore+":
                    ascore = (var,ascore[1])
                    text = f"+AScore: {ascore[0]}"

                # If var_type is "AScore-", update negative ascore and generate labels
                elif var_type == "AScore-":
                    ascore = (ascore[0],var)
                    text = f"-AScore: {ascore[1]}"

                # If var_type is "Checkpoint", update model and clip (if needed) and generate labels
                elif var_type == "Checkpoint":
                    ckpt_name = var[0]
                    if var[1] == None:
                        clip_skip = (clip_skip[1],clip_skip[1])
                    else:
                        clip_skip = (var[1],clip_skip[1])
                    if var[2] != None:
                        vae_name = var[2]
                    ckpt_filename = os.path.splitext(os.path.basename(ckpt_name))[0]
                    text = f"{ckpt_filename}"

                # If var_type is "Refiner", update model and clip (if needed) and generate labels
                elif var_type == "Refiner":
                    refiner_name = var[0]
                    if var[1] == None:
                        refiner_clip_skip = (refiner_clip_skip[1],refiner_clip_skip[1])
                    else:
                        refiner_clip_skip = (var[1],refiner_clip_skip[1])
                    ckpt_filename = os.path.splitext(os.path.basename(refiner_name))[0]
                    text = f"{ckpt_filename}"

                # If var_type is "Refiner On/Off", set end_at_step = max steps and generate labels
                elif var_type == "Refiner On/Off":
                    end_at_step = int(var * steps)
                    text = f"Refiner: {'On' if var < 1 else 'Off'}"

                elif var_type == "Clip Skip":
                    clip_skip = (var, clip_skip[1])
                    text = f"ClipSkip ({clip_skip[0]})"

                elif var_type == "Clip Skip (Refiner)":
                    refiner_clip_skip = (var, refiner_clip_skip[1])
                    text = f"RefClipSkip ({refiner_clip_skip[0]})"

                elif "LoRA" in var_type:
                    if not lora_stack:
                        lora_stack = var.copy()
                    else:
                        # Updating the first tuple of lora_stack
                        lora_stack[0] = tuple(v if v is not None else lora_stack[0][i] for i, v in enumerate(var[0]))

                    max_label_len = 50 + (12 * (len(lora_stack) - 1))
                    lora_name, lora_model_wt, lora_clip_wt = lora_stack[0]
                    lora_filename = os.path.splitext(os.path.basename(lora_name))[0]

                    if var_type == "LoRA":
                        if len(lora_stack) == 1:
                            lora_model_wt = format(float(lora_model_wt), ".2f").rstrip('0').rstrip('.')
                            lora_clip_wt = format(float(lora_clip_wt), ".2f").rstrip('0').rstrip('.')
                            lora_filename = lora_filename[:max_label_len - len(f"LoRA: ({lora_model_wt})")]
                            if lora_model_wt == lora_clip_wt:
                                text = f"LoRA: {lora_filename}({lora_model_wt})"
                            else:
                                text = f"LoRA: {lora_filename}({lora_model_wt},{lora_clip_wt})"
                        elif len(lora_stack) > 1:
                            lora_filenames = [os.path.splitext(os.path.basename(lora_name))[0] for lora_name, _, _ in
                                              lora_stack]
                            lora_details = [(format(float(lora_model_wt), ".2f").rstrip('0').rstrip('.'),
                                             format(float(lora_clip_wt), ".2f").rstrip('0').rstrip('.')) for
                                            _, lora_model_wt, lora_clip_wt in lora_stack]
                            non_name_length = sum(
                                len(f"({lora_details[i][0]},{lora_details[i][1]})") + 2 for i in range(len(lora_stack)))
                            available_space = max_label_len - non_name_length
                            max_name_length = available_space // len(lora_stack)
                            lora_filenames = [filename[:max_name_length] for filename in lora_filenames]
                            text_elements = [
                                f"{lora_filename}({lora_details[i][0]})" if lora_details[i][0] == lora_details[i][1]
                                else f"{lora_filename}({lora_details[i][0]},{lora_details[i][1]})" for i, lora_filename in
                                enumerate(lora_filenames)]
                            text = " ".join(text_elements)

                    elif var_type == "LoRA Batch":
                        text = f"LoRA: {lora_filename}"

                    elif var_type == "LoRA Wt":
                        lora_model_wt = format(float(lora_model_wt), ".2f").rstrip('0').rstrip('.')
                        text = f"LoRA Wt: {lora_model_wt}"

                    elif var_type == "LoRA MStr":
                        lora_model_wt = format(float(lora_model_wt), ".2f").rstrip('0').rstrip('.')
                        text = f"LoRA Mstr: {lora_model_wt}"

                    elif var_type == "LoRA CStr":
                        lora_clip_wt = format(float(lora_clip_wt), ".2f").rstrip('0').rstrip('.')
                        text = f"LoRA Cstr: {lora_clip_wt}"

                elif var_type in ["ControlNetStrength", "ControlNetStart%", "ControlNetEnd%"]:
                    if "Strength" in var_type:
                        entry_index = 2
                    elif "Start%" in var_type:
                        entry_index = 3
                    elif "End%" in var_type:
                        entry_index = 4

                    # If the first entry of cnet_stack is None, set it to var
                    if cnet_stack[0] is None:
                        cnet_stack = (var, cnet_stack[1])
                    else:
                        # Extract the desired entry from var's first tuple
                        entry_from_var = var[0][entry_index]

                        # Extract the first tuple from cnet_stack[0][0] and make it mutable
                        first_cn_entry = list(cnet_stack[0][0])

                        # Replace the appropriate entry
                        first_cn_entry[entry_index] = entry_from_var

                        # Further update first_cn_entry based on cnet_stack[1]
                        for i, value in enumerate(cnet_stack[1][-3:]):  # Considering last 3 entries
                            if value is not None:
                                first_cn_entry[i + 2] = value  # "+2" to offset for the first 2 entries of the tuple

                        # Convert back to tuple for the updated values
                        updated_first_entry = tuple(first_cn_entry)

                        # Construct the updated cnet_stack[0] using the updated_first_entry and the rest of the values from cnet_stack[0]
                        updated_cnet_stack_0 = [updated_first_entry] + list(cnet_stack[0][1:])

                        # Update cnet_stack
                        cnet_stack = (updated_cnet_stack_0, cnet_stack[1])

                    # Print the desired value
                    text = f'{var_type}: {round(cnet_stack[0][0][entry_index], 3)}'

                elif var_type == "XY_Capsule":
                    text = var.getLabel()

                else: # No matching type found
                    text=""

                def truncate_texts(texts, num_label, max_label_len):
                    truncate_length = max(min(max(len(text) for text in texts), max_label_len), 24)

                    return [text if len(text) <= truncate_length else text[:truncate_length] + "..." for text in
                            texts]

                # Add the generated text to var_label if it's not full
                if len(var_label) < num_label:
                    var_label.append(text)

                # If var_type VAE , truncate entries in the var_label list when it's full
                if len(var_label) == num_label and (var_type == "VAE" or var_type == "Checkpoint"
                                                    or var_type == "Refiner" or "LoRA" in var_type):
                    var_label = truncate_texts(var_label, num_label, max_label_len)

                # Return the modified variables
                return add_noise, seed, steps, start_at_step, end_at_step, return_with_leftover_noise, cfg,\
                    sampler_name, scheduler, denoise, vae_name, ckpt_name, clip_skip, \
                    refiner_name, refiner_clip_skip, positive_prompt, negative_prompt, ascore,\
                    lora_stack, cnet_stack, var_label

            #_______________________________________________________________________________________________________
            # The function below is used to optimally load Checkpoint/LoRA/VAE models between generations.
            def define_model(model, clip, clip_skip, refiner_model, refiner_clip, refiner_clip_skip,
                             ckpt_name, refiner_name, positive, negative, refiner_positive, refiner_negative,
                             positive_prompt, negative_prompt, ascore, vae, vae_name, lora_stack, cnet_stack, index,
                             types, xyplot_id, cache, sampler_type, empty_latent_width, empty_latent_height):

                # Variable to track wether to encode prompt or not
                encode = False
                encode_refiner = False

                # Unpack types tuple
                X_type, Y_type = types

                # Note: Index is held at 0 when Y_type == "Nothing"

                # Load Checkpoint if required. If Y_type is LoRA, required models will be loaded by load_lora func.
                if (X_type == "Checkpoint" and index == 0 and Y_type != "LoRA"):
                    if lora_stack is None:
                        model, clip, _ = load_checkpoint(ckpt_name, xyplot_id, cache=cache[1])
                    else: # Load Efficient Loader LoRA
                        model, clip = load_lora(lora_stack, ckpt_name, xyplot_id,
                                                cache=None, ckpt_cache=cache[1])
                    encode = True

                # Load LoRA if required
                elif (X_type == "LoRA" and index == 0):
                    # Don't cache Checkpoints
                    model, clip = load_lora(lora_stack, ckpt_name, xyplot_id, cache=cache[2])
                    encode = True
                elif Y_type == "LoRA":  # X_type must be Checkpoint, so cache those as defined
                    model, clip = load_lora(lora_stack, ckpt_name, xyplot_id,
                                            cache=None, ckpt_cache=cache[1])
                    encode = True
                elif X_type == "LoRA Batch" or X_type == "LoRA Wt" or X_type == "LoRA MStr" or X_type == "LoRA CStr":
                    # Don't cache Checkpoints or LoRAs
                    model, clip = load_lora(lora_stack, ckpt_name, xyplot_id, cache=0)
                    encode = True

                if (X_type == "Refiner" and index == 0) or Y_type == "Refiner":
                    refiner_model, refiner_clip, _ = \
                        load_checkpoint(refiner_name, xyplot_id, output_vae=False, cache=cache[3], ckpt_type="refn")
                    encode_refiner = True

                # Encode base prompt if required
                encode_types = ["Positive Prompt S/R", "Negative Prompt S/R", "Clip Skip", "ControlNetStrength",
                                "ControlNetStart%",  "ControlNetEnd%"]
                if (X_type in encode_types and index == 0) or Y_type in encode_types:
                    encode = True

                # Encode refiner prompt if required
                encode_refiner_types = ["Positive Prompt S/R", "Negative Prompt S/R", "AScore+", "AScore-",
                                        "Clip Skip (Refiner)"]
                if (X_type in encode_refiner_types and index == 0) or Y_type in encode_refiner_types:
                    encode_refiner = True

                # Encode base prompt
                if encode == True:
                    positive, negative, clip = \
                        encode_prompts(positive_prompt, negative_prompt, token_normalization, weight_interpretation,
                                       clip, clip_skip, refiner_clip, refiner_clip_skip, ascore, sampler_type == "sdxl",
                                       empty_latent_width, empty_latent_height, return_type="base")
                    # Apply ControlNet Stack if given
                    if cnet_stack:
                        controlnet_conditioning = TSC_Apply_ControlNet_Stack().apply_cnet_stack(positive, negative, cnet_stack)
                        positive, negative = controlnet_conditioning[0], controlnet_conditioning[1]

                if encode_refiner == True:
                    refiner_positive, refiner_negative, refiner_clip = \
                        encode_prompts(positive_prompt, negative_prompt, token_normalization, weight_interpretation,
                                       clip, clip_skip, refiner_clip, refiner_clip_skip, ascore, sampler_type == "sdxl",
                                       empty_latent_width, empty_latent_height, return_type="refiner")

                # Load VAE if required
                if (X_type == "VAE" and index == 0) or Y_type == "VAE":
                    #vae = load_vae(vae_name, xyplot_id, cache=cache[0])
                    vae = get_bvae_by_ckpt_name(ckpt_name) if vae_name == "Baked VAE" \
                        else load_vae(vae_name, xyplot_id, cache=cache[0])
                elif X_type == "Checkpoint" and index == 0 and vae_name:
                    vae = get_bvae_by_ckpt_name(ckpt_name) if vae_name == "Baked VAE" \
                        else load_vae(vae_name, xyplot_id, cache=cache[0])

                return model, positive, negative, refiner_model, refiner_positive, refiner_negative, vae

            # ______________________________________________________________________________________________________
            # The below function is used to generate the results based on all the processed variables
            def process_values(model, refiner_model, add_noise, seed, steps, start_at_step, end_at_step,
                               return_with_leftover_noise, cfg, sampler_name, scheduler, positive, negative,
                               refiner_positive, refiner_negative, latent_image, denoise, vae, vae_decode,
                               sampler_type, latent_list=[], image_tensor_list=[], image_pil_list=[], xy_capsule=None):

                capsule_result = None
                if xy_capsule is not None:
                    capsule_result = xy_capsule.get_result(model, clip, vae)
                    if capsule_result is not None:
                        image, latent = capsule_result
                        latent_list.append(latent)

                if capsule_result is None:

                    samples, images, _, _ = process_latent_image(model, seed, steps, cfg, sampler_name, scheduler, positive, negative,
                                                  latent_image, denoise, sampler_type, add_noise, start_at_step,
                                                  end_at_step, return_with_leftover_noise, refiner_model,
                                                  refiner_positive, refiner_negative, vae, vae_decode, preview_method)

                    # Add the latent tensor to the tensors list
                    latent_list.append(samples)

                    # Decode the latent tensor if required
                    image = images if images is not None else vae_decode_latent(vae, samples, vae_decode)

                    if xy_capsule is not None:
                        xy_capsule.set_result(image, samples)

                # Add the resulting image tensor to image_tensor_list
                image_tensor_list.append(image)

                # Convert the image from tensor to PIL Image and add it to the image_pil_list
                image_pil_list.append(tensor2pil(image))

                # Return the touched variables
                return latent_list, image_tensor_list, image_pil_list

            # ______________________________________________________________________________________________________
            # The below section is the heart of the XY Plot image generation

             # Initiate Plot label text variables X/Y_label
            X_label = []
            Y_label = []

            # Store the KSamplers original scheduler inside the same scheduler variable
            scheduler = (scheduler, scheduler)

            # Store the Eff Loaders original clip_skips inside the same clip_skip variables
            clip_skip = (clip_skip, clip_skip)
            refiner_clip_skip = (refiner_clip_skip, refiner_clip_skip)

            # Store types in a Tuple for easy function passing
            types = (X_type, Y_type)

            # Clone original model parameters
            def clone_or_none(*originals):
                cloned_items = []
                for original in originals:
                    try:
                        cloned_items.append(original.clone())
                    except (AttributeError, TypeError):
                        # If not clonable, just append the original item
                        cloned_items.append(original)
                return cloned_items
            original_model, original_clip, original_positive, original_negative,\
                original_refiner_model, original_refiner_clip, original_refiner_positive, original_refiner_negative =\
                clone_or_none(model, clip, positive, negative, refiner_model, refiner_clip, refiner_positive, refiner_negative)

            # Fill Plot Rows (X)
            for X_index, X in enumerate(X_value):
                # add a none value in the positive prompt memory.
                # the tuple is composed of (actual prompt, original prompte before S/R, prompt after X S/R)
                positive_prompt = (positive_prompt[0], positive_prompt[1], None)
                negative_prompt = (negative_prompt[0], negative_prompt[1], None)

                # Define X parameters and generate labels
                add_noise, seed, steps, start_at_step, end_at_step, return_with_leftover_noise, cfg,\
                    sampler_name, scheduler, denoise, vae_name, ckpt_name, clip_skip,\
                    refiner_name, refiner_clip_skip, positive_prompt, negative_prompt, ascore,\
                    lora_stack, cnet_stack, X_label = \
                    define_variable(X_type, X, add_noise, seed, steps, start_at_step, end_at_step,
                                    return_with_leftover_noise, cfg, sampler_name, scheduler, denoise, vae_name,
                                    ckpt_name, clip_skip, refiner_name, refiner_clip_skip, positive_prompt,
                                    negative_prompt, ascore, lora_stack, cnet_stack, X_label, len(X_value))

                if X_type != "Nothing" and Y_type == "Nothing":
                    if X_type == "XY_Capsule":
                        model, clip, refiner_model, refiner_clip = \
                            clone_or_none(original_model, original_clip, original_refiner_model, original_refiner_clip)
                        model, clip, vae = X.pre_define_model(model, clip, vae)

                    # Models & Conditionings
                    model, positive, negative, refiner_model, refiner_positive, refiner_negative, vae = \
                        define_model(model, clip, clip_skip[0], refiner_model, refiner_clip, refiner_clip_skip[0],
                                     ckpt_name, refiner_name, positive, negative, refiner_positive, refiner_negative,
                                     positive_prompt[0], negative_prompt[0], ascore, vae, vae_name, lora_stack, cnet_stack[0],
                                     0, types, xyplot_id, cache, sampler_type, empty_latent_width, empty_latent_height)

                    xy_capsule = None
                    if X_type == "XY_Capsule":
                        xy_capsule = X

                    # Generate Results
                    latent_list, image_tensor_list, image_pil_list = \
                        process_values(model, refiner_model, add_noise, seed, steps, start_at_step, end_at_step,
                                       return_with_leftover_noise, cfg, sampler_name, scheduler[0], positive, negative,
                                       refiner_positive, refiner_negative, latent_image, denoise, vae, vae_decode, sampler_type, xy_capsule=xy_capsule)

                elif X_type != "Nothing" and Y_type != "Nothing":
                    for Y_index, Y in enumerate(Y_value):

                        if Y_type == "XY_Capsule" or X_type == "XY_Capsule":
                            model, clip, refiner_model, refiner_clip = \
                                clone_or_none(original_model, original_clip, original_refiner_model, original_refiner_clip)

                        if Y_type == "XY_Capsule" and X_type == "XY_Capsule":
                            Y.set_x_capsule(X)

                        # Define Y parameters and generate labels
                        add_noise, seed, steps, start_at_step, end_at_step, return_with_leftover_noise, cfg,\
                            sampler_name, scheduler, denoise, vae_name, ckpt_name, clip_skip,\
                            refiner_name, refiner_clip_skip, positive_prompt, negative_prompt, ascore,\
                            lora_stack, cnet_stack, Y_label = \
                            define_variable(Y_type, Y, add_noise, seed, steps, start_at_step, end_at_step,
                                            return_with_leftover_noise, cfg, sampler_name, scheduler, denoise, vae_name,
                                            ckpt_name, clip_skip, refiner_name, refiner_clip_skip, positive_prompt,
                                            negative_prompt, ascore, lora_stack, cnet_stack, Y_label, len(Y_value))

                        if Y_type == "XY_Capsule":
                            model, clip, vae = Y.pre_define_model(model, clip, vae)
                        elif X_type == "XY_Capsule":
                            model, clip, vae = X.pre_define_model(model, clip, vae)

                        # Models & Conditionings
                        model, positive, negative, refiner_model, refiner_positive, refiner_negative, vae = \
                            define_model(model, clip, clip_skip[0], refiner_model, refiner_clip, refiner_clip_skip[0],
                                         ckpt_name, refiner_name, positive, negative, refiner_positive, refiner_negative,
                                         positive_prompt[0], negative_prompt[0], ascore, vae, vae_name, lora_stack, cnet_stack[0],
                                         Y_index, types, xyplot_id, cache, sampler_type, empty_latent_width,
                                         empty_latent_height)

                        # Generate Results
                        xy_capsule = None
                        if Y_type == "XY_Capsule":
                            xy_capsule = Y

                        latent_list, image_tensor_list, image_pil_list = \
                            process_values(model, refiner_model, add_noise, seed, steps, start_at_step, end_at_step,
                                           return_with_leftover_noise, cfg, sampler_name, scheduler[0],
                                           positive, negative, refiner_positive, refiner_negative, latent_image,
                                           denoise, vae, vae_decode, sampler_type, xy_capsule=xy_capsule)

            # Clean up cache
            if cache_models == "False":
                clear_cache_by_exception(xyplot_id, vae_dict=[], ckpt_dict=[], lora_dict=[], refn_dict=[])
            else:
                # Avoid caching models accross both X and Y
                if X_type == "Checkpoint":
                    clear_cache_by_exception(xyplot_id, lora_dict=[], refn_dict=[])
                elif X_type == "Refiner":
                    clear_cache_by_exception(xyplot_id, ckpt_dict=[], lora_dict=[])
                elif X_type == "LoRA":
                    clear_cache_by_exception(xyplot_id, ckpt_dict=[], refn_dict=[])

            # __________________________________________________________________________________________________________
            # Function for printing all plot variables (WARNING: This function is an absolute mess)
            def print_plot_variables(X_type, Y_type, X_value, Y_value, add_noise, seed, steps, start_at_step, end_at_step,
                                     return_with_leftover_noise, cfg, sampler_name, scheduler, denoise, vae_name, ckpt_name,
                                     clip_skip, refiner_name, refiner_clip_skip, ascore, lora_stack, cnet_stack, sampler_type,
                                     num_rows, num_cols, i_height, i_width):

                print("-" * 40)  # Print an empty line followed by a separator line
                print(f"{xyplot_message('XY Plot Results:')}")

                def get_vae_name(X_type, Y_type, X_value, Y_value, vae_name):
                    if X_type == "VAE":
                        vae_name = "\n      ".join(map(lambda x: os.path.splitext(os.path.basename(str(x)))[0], X_value))
                    elif Y_type == "VAE":
                        vae_name = "\n      ".join(map(lambda y: os.path.splitext(os.path.basename(str(y)))[0], Y_value))
                    elif vae_name:
                        vae_name = os.path.splitext(os.path.basename(str(vae_name)))[0]
                    else:
                        vae_name = ""
                    return vae_name

                def get_clip_skip(X_type, Y_type, X_value, Y_value, cskip, mode):
                    clip_type = "Clip Skip" if mode == "ckpt" else "Clip Skip (Refiner)"
                    if X_type == clip_type:
                        cskip = ", ".join(map(str, X_value))
                    elif Y_type == clip_type:
                        cskip = ", ".join(map(str, Y_value))
                    elif cskip[1] != None:
                        cskip = cskip[1]
                    else:
                        cskip = ""
                    return cskip

                def get_checkpoint_name(X_type, Y_type, X_value, Y_value, ckpt_name, clip_skip, mode, vae_name=None):

                    # If ckpt_name is None, return it as is
                    if ckpt_name is not None:
                        ckpt_name = os.path.basename(ckpt_name)

                    # Define types based on mode
                    primary_type = "Checkpoint" if mode == "ckpt" else "Refiner"
                    clip_type = "Clip Skip" if mode == "ckpt" else "Clip Skip (Refiner)"

                    # Determine ckpt and othr based on primary type
                    if X_type == primary_type:
                        ckpt_type, ckpt_value = X_type, X_value.copy()
                        othr_type, othr_value = Y_type, Y_value.copy()
                    elif Y_type == primary_type:
                        ckpt_type, ckpt_value = Y_type, Y_value.copy()
                        othr_type, othr_value = X_type, X_value.copy()
                    else:
                        # Process as per original function if mode is "ckpt"
                        clip_skip = get_clip_skip(X_type, Y_type, X_value, Y_value, clip_skip, mode)
                        if mode == "ckpt":
                            if vae_name:
                                vae_name = get_vae_name(X_type, Y_type, X_value, Y_value, vae_name)
                            return ckpt_name, clip_skip, vae_name
                        else:
                            # For refn mode
                            return ckpt_name, clip_skip

                    # Process clip skip based on mode
                    if othr_type == clip_type:
                        clip_skip = ", ".join(map(str, othr_value))
                    elif ckpt_value[0][1] != None:
                        clip_skip = None

                    # Process vae_name based on mode
                    if mode == "ckpt":
                        if othr_type == "VAE":
                            vae_name = get_vae_name(X_type, Y_type, X_value, Y_value, vae_name)
                        elif ckpt_value[0][2] != None:
                            vae_name = None

                    def format_name(v, _type):
                        base = os.path.basename(v[0])
                        if _type == clip_type and v[1] is not None:
                            return base
                        elif _type == "VAE" and v[1] is not None and v[2] is not None:
                            return f"{base}({v[1]})"
                        elif v[1] is not None and v[2] is not None:
                            return f"{base}({v[1]}) + vae:{v[2]}"
                        elif v[1] is not None:
                            return f"{base}({v[1]})"
                        else:
                            return base

                    ckpt_name = "\n      ".join([format_name(v, othr_type) for v in ckpt_value])
                    if mode == "ckpt":
                        return ckpt_name, clip_skip, vae_name
                    else:
                        return ckpt_name, clip_skip

                def get_lora_name(X_type, Y_type, X_value, Y_value, lora_stack=None):
                    lora_name = lora_wt = lora_model_str = lora_clip_str = None

                    # Check for all possible LoRA types
                    lora_types = ["LoRA", "LoRA Batch", "LoRA Wt", "LoRA MStr", "LoRA CStr"]

                    if X_type not in lora_types and Y_type not in lora_types:
                        if lora_stack:
                            names_list = []
                            for name, model_wt, clip_wt in lora_stack:
                                base_name = os.path.splitext(os.path.basename(name))[0]
                                formatted_str = f"{base_name}({round(model_wt, 3)},{round(clip_wt, 3)})"
                                names_list.append(formatted_str)
                            lora_name = f"[{', '.join(names_list)}]"
                    else:
                        if X_type in lora_types:
                            value = get_lora_sublist_name(X_type, X_value)
                            if  X_type == "LoRA":
                                lora_name = value
                                lora_model_str = None
                                lora_clip_str = None
                            if X_type == "LoRA Batch":
                                lora_name = value
                                lora_model_str = X_value[0][0][1] if lora_model_str is None else lora_model_str
                                lora_clip_str = X_value[0][0][2] if lora_clip_str is None else lora_clip_str
                            elif X_type == "LoRA MStr":
                                lora_name = os.path.basename(X_value[0][0][0]) if lora_name is None else lora_name
                                lora_model_str = value
                                lora_clip_str = X_value[0][0][2] if lora_clip_str is None else lora_clip_str
                            elif X_type == "LoRA CStr":
                                lora_name = os.path.basename(X_value[0][0][0]) if lora_name is None else lora_name
                                lora_model_str = X_value[0][0][1] if lora_model_str is None else lora_model_str
                                lora_clip_str = value
                            elif X_type == "LoRA Wt":
                                lora_name = os.path.basename(X_value[0][0][0]) if lora_name is None else lora_name
                                lora_wt = value

                        if Y_type in lora_types:
                            value = get_lora_sublist_name(Y_type, Y_value)
                            if  Y_type == "LoRA":
                                lora_name = value
                                lora_model_str = None
                                lora_clip_str = None
                            if Y_type == "LoRA Batch":
                                lora_name = value
                                lora_model_str = Y_value[0][0][1] if lora_model_str is None else lora_model_str
                                lora_clip_str = Y_value[0][0][2] if lora_clip_str is None else lora_clip_str
                            elif Y_type == "LoRA MStr":
                                lora_name = os.path.basename(Y_value[0][0][0]) if lora_name is None else lora_name
                                lora_model_str = value
                                lora_clip_str = Y_value[0][0][2] if lora_clip_str is None else lora_clip_str
                            elif Y_type == "LoRA CStr":
                                lora_name = os.path.basename(Y_value[0][0][0]) if lora_name is None else lora_name
                                lora_model_str = Y_value[0][0][1] if lora_model_str is None else lora_model_str
                                lora_clip_str = value
                            elif Y_type == "LoRA Wt":
                                lora_name = os.path.basename(Y_value[0][0][0]) if lora_name is None else lora_name
                                lora_wt = value

                    return lora_name, lora_wt, lora_model_str, lora_clip_str

                def get_lora_sublist_name(lora_type, lora_value):
                    if lora_type == "LoRA" or lora_type == "LoRA Batch":
                        formatted_sublists = []
                        for sublist in lora_value:
                            formatted_entries = []
                            for x in sublist:
                                base_name = os.path.splitext(os.path.basename(str(x[0])))[0]
                                formatted_str = f"{base_name}({round(x[1], 3)},{round(x[2], 3)})" if lora_type == "LoRA" else f"{base_name}"
                                formatted_entries.append(formatted_str)
                            formatted_sublists.append(f"{', '.join(formatted_entries)}")
                        return "\n      ".join(formatted_sublists)
                    elif lora_type == "LoRA MStr":
                        return ", ".join([str(round(x[0][1], 3)) for x in lora_value])
                    elif lora_type == "LoRA CStr":
                        return ", ".join([str(round(x[0][2], 3)) for x in lora_value])
                    elif lora_type == "LoRA Wt":
                        return ", ".join([str(round(x[0][1], 3)) for x in lora_value])  # assuming LoRA Wt uses the second value
                    else:
                        return ""

                # VAE, Checkpoint, Clip Skip, LoRA
                ckpt_name, clip_skip, vae_name = get_checkpoint_name(X_type, Y_type, X_value, Y_value, ckpt_name, clip_skip, "ckpt", vae_name)
                lora_name, lora_wt, lora_model_str, lora_clip_str = get_lora_name(X_type, Y_type, X_value, Y_value, lora_stack)
                refiner_name, refiner_clip_skip = get_checkpoint_name(X_type, Y_type, X_value, Y_value, refiner_name, refiner_clip_skip, "refn")

                # AddNoise
                add_noise = ", ".join(map(str, X_value)) if X_type == "AddNoise" else ", ".join(
                    map(str, Y_value)) if Y_type == "AddNoise" else add_noise

                # Seeds++ Batch
                seed = "\n      ".join(map(str, X_value)) if X_type == "Seeds++ Batch" else "\n      ".join(
                    map(str, Y_value)) if Y_type == "Seeds++ Batch" else seed

                # Steps
                steps = ", ".join(map(str, X_value)) if X_type == "Steps" else ", ".join(
                    map(str, Y_value)) if Y_type == "Steps" else steps

                # StartStep
                start_at_step = ", ".join(map(str, X_value)) if X_type == "StartStep" else ", ".join(
                    map(str, Y_value)) if Y_type == "StartStep" else start_at_step

                # EndStep/RefineStep
                end_at_step = ", ".join(map(str, X_value)) if X_type in ["EndStep", "RefineStep"] else ", ".join(
                    map(str, Y_value)) if Y_type in ["EndStep", "RefineStep"] else end_at_step

                # ReturnNoise
                return_with_leftover_noise = ", ".join(map(str, X_value)) if X_type == "ReturnNoise" else ", ".join(
                    map(str, Y_value)) if Y_type == "ReturnNoise" else return_with_leftover_noise

                # CFG
                cfg = ", ".join(map(str, X_value)) if X_type == "CFG Scale" else ", ".join(
                    map(str, Y_value)) if Y_type == "CFG Scale" else round(cfg,3)

                # Sampler/Scheduler
                if X_type == "Sampler":
                    if Y_type == "Scheduler":
                        sampler_name = ", ".join([f"{x[0]}" for x in X_value])
                        scheduler = ", ".join([f"{y}" for y in Y_value])
                    else:
                        sampler_name = ", ".join([f"{x[0]}({x[1] if x[1] != '' and x[1] is not None else scheduler[1]})" for x in X_value])
                        scheduler = "_"
                elif Y_type == "Sampler":
                    if X_type == "Scheduler":
                        sampler_name = ", ".join([f"{y[0]}" for y in Y_value])
                        scheduler = ", ".join([f"{x}" for x in X_value])
                    else:
                        sampler_name = ", ".join([f"{y[0]}({y[1] if y[1] != '' and y[1] is not None else scheduler[1]})" for y in Y_value])
                        scheduler = "_"
                else:
                    scheduler = ", ".join([str(x[0]) if isinstance(x, tuple) else str(x) for x in X_value]) if X_type == "Scheduler" else \
                        ", ".join([str(y[0]) if isinstance(y, tuple) else str(y) for y in Y_value]) if Y_type == "Scheduler" else scheduler[0]

                # Denoise
                denoise = ", ".join(map(str, X_value)) if X_type == "Denoise" else ", ".join(
                    map(str, Y_value)) if Y_type == "Denoise" else round(denoise,3)

                # Check if ascore is None
                if ascore is None:
                    pos_ascore = neg_ascore = None
                else:
                    # Ascore+
                    pos_ascore = (", ".join(map(str, X_value)) if X_type == "Ascore+"
                                  else ", ".join(map(str, Y_value)) if Y_type == "Ascore+" else round(ascore[0],3))
                    # Ascore-
                    neg_ascore = (", ".join(map(str, X_value)) if X_type == "Ascore-"
                                  else ", ".join(map(str, Y_value)) if Y_type == "Ascore-" else round(ascore[1],3))

                #..........................................PRINTOUTS....................................................
                print(f"(X) {X_type}")
                print(f"(Y) {Y_type}")
                print(f"img_count: {len(X_value)*len(Y_value)}")
                print(f"img_dims: {i_height} x {i_width}")
                print(f"plot_dim: {num_cols} x {num_rows}")
                print(f"ckpt: {ckpt_name if ckpt_name is not None else ''}")
                if clip_skip:
                    print(f"clip_skip: {clip_skip}")
                if sampler_type == "sdxl":
                    if refiner_clip_skip == "_":
                        print(f"refiner(clipskip): {refiner_name if refiner_name is not None else ''}")
                    else:
                        print(f"refiner: {refiner_name if refiner_name is not None else ''}")
                        print(f"refiner_clip_skip: {refiner_clip_skip if refiner_clip_skip is not None else ''}")
                        print(f"+ascore: {pos_ascore if pos_ascore is not None else ''}")
                        print(f"-ascore: {neg_ascore if neg_ascore is not None else ''}")
                if lora_name:
                    print(f"lora: {lora_name}")
                if lora_wt:
                    print(f"lora_wt: {lora_wt}")
                if lora_model_str:
                    print(f"lora_mstr: {lora_model_str}")
                if lora_clip_str:
                    print(f"lora_cstr: {lora_clip_str}")
                if vae_name:
                    print(f"vae:  {vae_name}")
                if sampler_type == "advanced":
                    print(f"add_noise: {add_noise}")
                print(f"seed: {seed}")
                print(f"steps: {steps}")
                if sampler_type == "advanced":
                    print(f"start_at_step: {start_at_step}")
                    print(f"end_at_step: {end_at_step}")
                    print(f"return_noise: {return_with_leftover_noise}")
                if sampler_type == "sdxl":
                    print(f"start_at_step: {start_at_step}")
                    if X_type == "Refiner On/Off":
                        print(f"refine_at_percent: {X_value[0]}")
                    elif Y_type == "Refiner On/Off":
                        print(f"refine_at_percent: {Y_value[0]}")
                    else:
                        print(f"refine_at_step: {end_at_step}")
                print(f"cfg: {cfg}")
                if scheduler == "_":
                    print(f"sampler(scheduler): {sampler_name}")
                else:
                    print(f"sampler: {sampler_name}")
                    print(f"scheduler: {scheduler}")
                if sampler_type == "regular":
                    print(f"denoise: {denoise}")

                if X_type == "Positive Prompt S/R" or Y_type == "Positive Prompt S/R":
                    positive_prompt = ", ".join([str(x[0]) if i == 0 else str(x[1]) for i, x in enumerate(
                        X_value)]) if X_type == "Positive Prompt S/R" else ", ".join(
                        [str(y[0]) if i == 0 else str(y[1]) for i, y in
                         enumerate(Y_value)]) if Y_type == "Positive Prompt S/R" else positive_prompt
                    print(f"+prompt_s/r: {positive_prompt}")

                if X_type == "Negative Prompt S/R" or Y_type == "Negative Prompt S/R":
                    negative_prompt = ", ".join([str(x[0]) if i == 0 else str(x[1]) for i, x in enumerate(
                        X_value)]) if X_type == "Negative Prompt S/R" else ", ".join(
                        [str(y[0]) if i == 0 else str(y[1]) for i, y in
                         enumerate(Y_value)]) if Y_type == "Negative Prompt S/R" else negative_prompt
                    print(f"-prompt_s/r: {negative_prompt}")

                if "ControlNet" in X_type or "ControlNet" in Y_type:
                    cnet_strength,  cnet_start_pct, cnet_end_pct = cnet_stack[1]

                if "ControlNet" in X_type:
                    if "Strength" in X_type:
                        cnet_strength = [str(round(inner_list[0][2], 3)) for inner_list in X_value if
                                           isinstance(inner_list, list) and
                                           inner_list and isinstance(inner_list[0], tuple) and len(inner_list[0]) >= 3]
                    if "Start%" in X_type:
                        cnet_start_pct = [str(round(inner_list[0][3], 3)) for inner_list in X_value if
                                           isinstance(inner_list, list) and
                                           inner_list and isinstance(inner_list[0], tuple) and len(inner_list[0]) >= 3]
                    if "End%" in X_type:
                        cnet_end_pct = [str(round(inner_list[0][4], 3)) for inner_list in X_value if
                                           isinstance(inner_list, list) and
                                           inner_list and isinstance(inner_list[0], tuple) and len(inner_list[0]) >= 3]
                if "ControlNet" in Y_type:
                    if "Strength" in Y_type:
                        cnet_strength = [str(round(inner_list[0][2], 3)) for inner_list in Y_value if
                                         isinstance(inner_list, list) and
                                         inner_list and isinstance(inner_list[0], tuple) and len(
                                             inner_list[0]) >= 3]
                    if "Start%" in Y_type:
                        cnet_start_pct = [str(round(inner_list[0][3], 3)) for inner_list in Y_value if
                                          isinstance(inner_list, list) and
                                          inner_list and isinstance(inner_list[0], tuple) and len(
                                              inner_list[0]) >= 3]
                    if "End%" in Y_type:
                        cnet_end_pct = [str(round(inner_list[0][4], 3)) for inner_list in Y_value if
                                         isinstance(inner_list, list) and
                                         inner_list and isinstance(inner_list[0], tuple) and len(
                                             inner_list[0]) >= 3]

                if "ControlNet" in X_type or "ControlNet" in Y_type:
                    print(f"cnet_strength: {', '.join(cnet_strength) if isinstance(cnet_strength, list) else cnet_strength}")
                    print(f"cnet_start%: {', '.join(cnet_start_pct) if isinstance(cnet_start_pct, list) else cnet_start_pct}")
                    print(f"cnet_end%: {', '.join(cnet_end_pct) if isinstance(cnet_end_pct, list) else cnet_end_pct}")

            # ______________________________________________________________________________________________________
            def adjusted_font_size(text, initial_font_size, i_width):
                font = ImageFont.truetype(str(Path(font_path)), initial_font_size)
                text_width = font.getlength(text)

                if text_width > (i_width * 0.9):
                    scaling_factor = 0.9  # A value less than 1 to shrink the font size more aggressively
                    new_font_size = int(initial_font_size * (i_width / text_width) * scaling_factor)
                else:
                    new_font_size = initial_font_size

                return new_font_size

            # ______________________________________________________________________________________________________

            def rearrange_list_A(arr, num_cols, num_rows):
                new_list = []
                for i in range(num_rows):
                    for j in range(num_cols):
                        index = j * num_rows + i
                        new_list.append(arr[index])
                return new_list

            def rearrange_list_B(arr, num_rows, num_cols):
                new_list = []
                for i in range(num_rows):
                    for j in range(num_cols):
                        index = i * num_cols + j
                        new_list.append(arr[index])
                return new_list

            # Extract plot dimensions
            num_rows = max(len(Y_value) if Y_value is not None else 0, 1)
            num_cols = max(len(X_value) if X_value is not None else 0, 1)

            # Flip X & Y results back if flipped earlier (for Checkpoint/LoRA For loop optimizations)
            if flip_xy == True:
                X_type, Y_type = Y_type, X_type
                X_value, Y_value = Y_value, X_value
                X_label, Y_label = Y_label, X_label
                num_rows, num_cols = num_cols, num_rows
                image_pil_list = rearrange_list_A(image_pil_list, num_rows, num_cols)
            else:
                image_pil_list = rearrange_list_B(image_pil_list, num_rows, num_cols)
                image_tensor_list = rearrange_list_A(image_tensor_list, num_cols, num_rows)
                latent_list = rearrange_list_A(latent_list, num_cols, num_rows)

            # Extract final image dimensions
            i_height, i_width = image_tensor_list[0].shape[1], image_tensor_list[0].shape[2]

            # Print XY Plot Results
            print_plot_variables(X_type, Y_type, X_value, Y_value, add_noise, seed,  steps, start_at_step, end_at_step,
                                 return_with_leftover_noise, cfg, sampler_name, scheduler, denoise, vae_name, ckpt_name,
                                 clip_skip, refiner_name, refiner_clip_skip, ascore, lora_stack, cnet_stack,
                                 sampler_type, num_rows, num_cols, i_height, i_width)

            # Concatenate the 'samples' and 'noise_mask' tensors along the first dimension (dim=0)
            keys = latent_list[0].keys()
            result = {}
            for key in keys:
                tensors = [d[key] for d in latent_list]
                result[key] = torch.cat(tensors, dim=0)
            latent_list = result

            # Store latent_list as last latent
            ###update_value_by_id("latent", my_unique_id, latent_list)

            # Calculate the dimensions of the white background image
            border_size_top = i_width // 15

            # Longest Y-label length
            if len(Y_label) > 0:
                Y_label_longest = max(len(s) for s in Y_label)
            else:
                # Handle the case when the sequence is empty
                Y_label_longest = 0  # or any other appropriate value

            Y_label_scale = min(Y_label_longest + 4,24) / 24

            if Y_label_orientation == "Vertical":
                border_size_left = border_size_top
            else:  # Assuming Y_label_orientation is "Horizontal"
                # border_size_left is now min(i_width, i_height) plus 20% of the difference between the two
                border_size_left = min(i_width, i_height) + int(0.2 * abs(i_width - i_height))
                border_size_left = int(border_size_left * Y_label_scale)

            # Modify the border size, background width and x_offset initialization based on Y_type and Y_label_orientation
            if Y_type == "Nothing":
                bg_width = num_cols * i_width + (num_cols - 1) * grid_spacing
                x_offset_initial = 0
            else:
                if Y_label_orientation == "Vertical":
                    bg_width = num_cols * i_width + (num_cols - 1) * grid_spacing + 3 * border_size_left
                    x_offset_initial = border_size_left * 3
                else:  # Assuming Y_label_orientation is "Horizontal"
                    bg_width = num_cols * i_width + (num_cols - 1) * grid_spacing + border_size_left
                    x_offset_initial = border_size_left

            # Modify the background height based on X_type
            if X_type == "Nothing":
                bg_height = num_rows * i_height + (num_rows - 1) * grid_spacing
                y_offset = 0
            else:
                bg_height = num_rows * i_height + (num_rows - 1) * grid_spacing + 3 * border_size_top
                y_offset = border_size_top * 3

            # Create the white background image
            background = Image.new('RGBA', (int(bg_width), int(bg_height)), color=(255, 255, 255, 255))

            for row in range(num_rows):

                # Initialize the X_offset
                x_offset = x_offset_initial

                for col in range(num_cols):
                    # Calculate the index for image_pil_list
                    index = col * num_rows + row
                    img = image_pil_list[index]

                    # Paste the image
                    background.paste(img, (x_offset, y_offset))

                    if row == 0 and X_type != "Nothing":
                        # Assign text
                        text = X_label[col]

                        # Add the corresponding X_value as a label above the image
                        initial_font_size = int(48 * img.width / 512)
                        font_size = adjusted_font_size(text, initial_font_size, img.width)
                        label_height = int(font_size*1.5)

                        # Create a white background label image
                        label_bg = Image.new('RGBA', (img.width, label_height), color=(255, 255, 255, 0))
                        d = ImageDraw.Draw(label_bg)

                        # Create the font object
                        font = ImageFont.truetype(str(Path(font_path)), font_size)

                        # Calculate the text size and the starting position
                        _, _, text_width, text_height = d.textbbox([0,0], text, font=font)
                        text_x = (img.width - text_width) // 2
                        text_y = (label_height - text_height) // 2

                        # Add the text to the label image
                        d.text((text_x, text_y), text, fill='black', font=font)

                        # Calculate the available space between the top of the background and the top of the image
                        available_space = y_offset - label_height

                        # Calculate the new Y position for the label image
                        label_y = available_space // 2

                        # Paste the label image above the image on the background using alpha_composite()
                        background.alpha_composite(label_bg, (x_offset, label_y))

                    if col == 0 and Y_type != "Nothing":
                        # Assign text
                        text = Y_label[row]

                        # Add the corresponding Y_value as a label to the left of the image
                        if Y_label_orientation == "Vertical":
                            initial_font_size = int(48 * i_width / 512)  # Adjusting this to be same as X_label size
                            font_size = adjusted_font_size(text, initial_font_size, i_width)
                        else:  # Assuming Y_label_orientation is "Horizontal"
                            initial_font_size = int(48 *  (border_size_left/Y_label_scale) / 512)  # Adjusting this to be same as X_label size
                            font_size = adjusted_font_size(text, initial_font_size,  int(border_size_left/Y_label_scale))

                        # Create a white background label image
                        label_bg = Image.new('RGBA', (img.height, int(font_size*1.2)), color=(255, 255, 255, 0))
                        d = ImageDraw.Draw(label_bg)

                        # Create the font object
                        font = ImageFont.truetype(str(Path(font_path)), font_size)

                        # Calculate the text size and the starting position
                        _, _, text_width, text_height = d.textbbox([0,0], text, font=font)
                        text_x = (img.height - text_width) // 2
                        text_y = (font_size - text_height) // 2

                        # Add the text to the label image
                        d.text((text_x, text_y), text, fill='black', font=font)

                        # Rotate the label_bg 90 degrees counter-clockwise only if Y_label_orientation is "Vertical"
                        if Y_label_orientation == "Vertical":
                            label_bg = label_bg.rotate(90, expand=True)

                        # Calculate the available space between the left of the background and the left of the image
                        available_space = x_offset - label_bg.width

                        # Calculate the new X position for the label image
                        label_x = available_space // 2

                        # Calculate the Y position for the label image based on its orientation
                        if Y_label_orientation == "Vertical":
                            label_y = y_offset + (img.height - label_bg.height) // 2
                        else:  # Assuming Y_label_orientation is "Horizontal"
                            label_y = y_offset + img.height - (img.height - label_bg.height) // 2

                        # Paste the label image to the left of the image on the background using alpha_composite()
                        background.alpha_composite(label_bg, (label_x, label_y))

                    # Update the x_offset
                    x_offset += img.width + grid_spacing

                # Update the y_offset
                y_offset += img.height + grid_spacing

            xy_plot_image = pil2tensor(background)

         # Generate the preview_images
        preview_images = PreviewImage().save_images(xy_plot_image)["ui"]["images"]

        # Generate output_images
        output_images = torch.stack([tensor.squeeze() for tensor in image_tensor_list])

        # Set the output_image the same as plot image defined by 'xyplot_as_output_image'
        if xyplot_as_output_image == True:
            output_images = xy_plot_image

        # Print cache if set to true
        if cache_models == "True":
            print_loaded_objects_entries(xyplot_id, prompt)

        print("-" * 40)  # Print an empty line followed by a separator line

        if sampler_type == "sdxl":
            sdxl_tuple = original_model, original_clip, original_positive, original_negative,\
                original_refiner_model, original_refiner_clip, original_refiner_positive, original_refiner_negative
            result = (sdxl_tuple, latent_list, optional_vae, output_images,)
        else:
            result = (original_model, original_positive, original_negative, latent_list, optional_vae, output_images,)
        return {"ui": {"images": preview_images}, "result": result}

```
