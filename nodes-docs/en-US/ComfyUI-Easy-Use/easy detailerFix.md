---
tags:
- DetailEnhancement
- Image
- Pipeline
---

# DetailerFix
## Documentation
- Class name: `easy detailerFix`
- Category: `EasyUse/Fix`
- Output node: `True`

The `easy detailerFix` node is designed to enhance and refine the details of generated images, focusing on improving visual quality and coherence. It applies a series of adjustments and fixes to the image, aiming to correct any imperfections and enhance overall detail, making it an essential step for achieving high-quality, polished outputs.
## Input types
### Required
- **`pipe`**
    - Specifies the pipeline configuration to be used for the detailer fix process, which includes model and processing settings.
    - Comfy dtype: `PIPE_LINE`
    - Python dtype: `Tuple`
- **`image_output`**
    - Determines the output format for the images, affecting how results are displayed or saved.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`link_id`**
    - Identifies the link for sending images, used when the output is configured to be sent to a specific destination.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`save_prefix`**
    - Sets the prefix for saved images, organizing output files according to user-defined naming conventions.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`model`**
    - Optionally specifies a model to be used for the detailer fix process, allowing for customization of enhancements.
    - Comfy dtype: `MODEL`
    - Python dtype: `Optional[str]`
## Output types
- **`pipe`**
    - Comfy dtype: `PIPE_LINE`
    - Outputs the updated pipeline configuration after applying detail fixes.
    - Python dtype: `Tuple`
- **`image`**
    - Comfy dtype: `IMAGE`
    - The enhanced image after detail fixes have been applied.
    - Python dtype: `ndarray`
- **`cropped_refined`**
    - Comfy dtype: `IMAGE`
    - The refined cropped version of the enhanced image.
    - Python dtype: `ndarray`
- **`cropped_enhanced_alpha`**
    - Comfy dtype: `IMAGE`
    - The cropped image with enhanced details and alpha transparency.
    - Python dtype: `ndarray`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class detailerFix:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "pipe": ("PIPE_LINE",),
            "image_output": (["Hide", "Preview", "Save", "Hide&Save", "Sender", "Sender&Save"],{"default": "Preview"}),
            "link_id": ("INT", {"default": 0, "min": 0, "max": sys.maxsize, "step": 1}),
            "save_prefix": ("STRING", {"default": "ComfyUI"}),
        },
            "optional": {
                "model": ("MODEL",),
            },
            "hidden": {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO", "my_unique_id": "UNIQUE_ID", }
        }

    RETURN_TYPES = ("PIPE_LINE", "IMAGE", "IMAGE", "IMAGE")
    RETURN_NAMES = ("pipe", "image", "cropped_refined", "cropped_enhanced_alpha")
    OUTPUT_NODE = True
    OUTPUT_IS_LIST = (False, False, True, True)
    FUNCTION = "doit"

    CATEGORY = "EasyUse/Fix"


    def doit(self, pipe, image_output, link_id, save_prefix, model=None, prompt=None, extra_pnginfo=None, my_unique_id=None):

        # Clean loaded_objects
        easyCache.update_loaded_objects(prompt)

        my_unique_id = int(my_unique_id)

        model = model or (pipe["model"] if "model" in pipe else None)
        if model is None:
            raise Exception(f"[ERROR] model or pipe['model'] is missing")

        detail_fix_settings = pipe["detail_fix_settings"] if "detail_fix_settings" in pipe else None
        if detail_fix_settings is None:
            raise Exception(f"[ERROR] detail_fix_settings or pipe['detail_fix_settings'] is missing")

        mask = pipe["mask"] if "mask" in pipe else None

        image = pipe["images"]
        clip = pipe["clip"]
        vae = pipe["vae"]
        seed = pipe["seed"]
        positive = pipe["positive"]
        negative = pipe["negative"]
        loader_settings = pipe["loader_settings"] if "loader_settings" in pipe else {}
        guide_size = pipe["detail_fix_settings"]["guide_size"] if "guide_size" in pipe["detail_fix_settings"] else 256
        guide_size_for = pipe["detail_fix_settings"]["guide_size_for"] if "guide_size_for" in pipe[
            "detail_fix_settings"] else True
        max_size = pipe["detail_fix_settings"]["max_size"] if "max_size" in pipe["detail_fix_settings"] else 768
        steps = pipe["detail_fix_settings"]["steps"] if "steps" in pipe["detail_fix_settings"] else 20
        cfg = pipe["detail_fix_settings"]["cfg"] if "cfg" in pipe["detail_fix_settings"] else 1.0
        sampler_name = pipe["detail_fix_settings"]["sampler_name"] if "sampler_name" in pipe[
            "detail_fix_settings"] else None
        scheduler = pipe["detail_fix_settings"]["scheduler"] if "scheduler" in pipe["detail_fix_settings"] else None
        denoise = pipe["detail_fix_settings"]["denoise"] if "denoise" in pipe["detail_fix_settings"] else 0.5
        feather = pipe["detail_fix_settings"]["feather"] if "feather" in pipe["detail_fix_settings"] else 5
        crop_factor = pipe["detail_fix_settings"]["crop_factor"] if "crop_factor" in pipe["detail_fix_settings"] else 3.0
        drop_size = pipe["detail_fix_settings"]["drop_size"] if "drop_size" in pipe["detail_fix_settings"] else 10
        refiner_ratio = pipe["detail_fix_settings"]["refiner_ratio"] if "refiner_ratio" in pipe else 0.2
        batch_size = pipe["detail_fix_settings"]["batch_size"] if "batch_size" in pipe["detail_fix_settings"] else 1
        noise_mask = pipe["detail_fix_settings"]["noise_mask"] if "noise_mask" in pipe["detail_fix_settings"] else None
        force_inpaint = pipe["detail_fix_settings"]["force_inpaint"] if "force_inpaint" in pipe["detail_fix_settings"] else False
        wildcard = pipe["detail_fix_settings"]["wildcard"] if "wildcard" in pipe["detail_fix_settings"] else ""
        cycle = pipe["detail_fix_settings"]["cycle"] if "cycle" in pipe["detail_fix_settings"] else 1

        bbox_segm_pipe = pipe["bbox_segm_pipe"] if pipe and "bbox_segm_pipe" in pipe else None
        sam_pipe = pipe["sam_pipe"] if "sam_pipe" in pipe else None

        # 细节修复初始时间
        start_time = int(time.time() * 1000)
        if "mask_settings" in pipe:
            mask_mode = pipe['mask_settings']["mask_mode"] if "inpaint_model" in pipe['mask_settings'] else True
            inpaint_model = pipe['mask_settings']["inpaint_model"] if "inpaint_model" in pipe['mask_settings'] else False
            noise_mask_feather = pipe['mask_settings']["noise_mask_feather"] if "noise_mask_feather" in pipe['mask_settings'] else 20
            cls = ALL_NODE_CLASS_MAPPINGS["MaskDetailerPipe"]
            if "MaskDetailerPipe" not in ALL_NODE_CLASS_MAPPINGS:
                raise Exception(f"[ERROR] To use MaskDetailerPipe, you need to install 'Impact Pack'")
            basic_pipe = (model, clip, vae, positive, negative)
            result_img, result_cropped_enhanced, result_cropped_enhanced_alpha, basic_pipe, refiner_basic_pipe_opt = cls().doit(image, mask, basic_pipe, guide_size, guide_size_for, max_size, mask_mode,
             seed, steps, cfg, sampler_name, scheduler, denoise,
             feather, crop_factor, drop_size, refiner_ratio, batch_size, cycle=1,
             refiner_basic_pipe_opt=None, detailer_hook=None, inpaint_model=inpaint_model, noise_mask_feather=noise_mask_feather)
            result_mask = mask
            result_cnet_images = ()
        else:
            if bbox_segm_pipe is None:
                raise Exception(f"[ERROR] bbox_segm_pipe or pipe['bbox_segm_pipe'] is missing")
            if sam_pipe is None:
                raise Exception(f"[ERROR] sam_pipe or pipe['sam_pipe'] is missing")
            bbox_detector_opt, bbox_threshold, bbox_dilation, bbox_crop_factor, segm_detector_opt = bbox_segm_pipe
            sam_model_opt, sam_detection_hint, sam_dilation, sam_threshold, sam_bbox_expansion, sam_mask_hint_threshold, sam_mask_hint_use_negative = sam_pipe
            if "FaceDetailer" not in ALL_NODE_CLASS_MAPPINGS:
                raise Exception(f"[ERROR] To use FaceDetailer, you need to install 'Impact Pack'")
            cls = ALL_NODE_CLASS_MAPPINGS["FaceDetailer"]

            result_img, result_cropped_enhanced, result_cropped_enhanced_alpha, result_mask, pipe, result_cnet_images = cls().doit(
                image, model, clip, vae, guide_size, guide_size_for, max_size, seed, steps, cfg, sampler_name,
                scheduler,
                positive, negative, denoise, feather, noise_mask, force_inpaint,
                bbox_threshold, bbox_dilation, bbox_crop_factor,
                sam_detection_hint, sam_dilation, sam_threshold, sam_bbox_expansion, sam_mask_hint_threshold,
                sam_mask_hint_use_negative, drop_size, bbox_detector_opt, wildcard, cycle, sam_model_opt,
                segm_detector_opt,
                detailer_hook=None)

        # 细节修复结束时间
        end_time = int(time.time() * 1000)

        spent_time = 'Fix:' + str((end_time - start_time) / 1000) + '"'

        results = easySave(result_img, save_prefix, image_output, prompt, extra_pnginfo)
        sampler.update_value_by_id("results", my_unique_id, results)

        # Clean loaded_objects
        easyCache.update_loaded_objects(prompt)

        new_pipe = {
            "samples": None,
            "images": result_img,
            "model": model,
            "clip": clip,
            "vae": vae,
            "seed": seed,
            "positive": positive,
            "negative": negative,
            "wildcard": wildcard,
            "bbox_segm_pipe": bbox_segm_pipe,
            "sam_pipe": sam_pipe,

            "loader_settings": {
                **loader_settings,
                "spent_time": spent_time
            },
            "detail_fix_settings": detail_fix_settings
        }
        if "mask_settings" in pipe:
            new_pipe["mask_settings"] = pipe["mask_settings"]

        sampler.update_value_by_id("pipe_line", my_unique_id, new_pipe)

        del bbox_segm_pipe
        del sam_pipe
        del pipe

        if image_output in ("Hide", "Hide&Save"):
            return {"ui": {},
                    "result": (new_pipe, result_img, result_cropped_enhanced, result_cropped_enhanced_alpha, result_mask, result_cnet_images )}

        if image_output in ("Sender", "Sender&Save"):
            PromptServer.instance.send_sync("img-send", {"link_id": link_id, "images": results})

        return {"ui": {"images": results}, "result": (new_pipe, result_img, result_cropped_enhanced, result_cropped_enhanced_alpha, result_mask, result_cnet_images )}

```
