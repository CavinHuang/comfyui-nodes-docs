---
tags:
- Image
- Pipeline
- PipelineTransformation
---

# ToDetailerPipeSDXL
## Documentation
- Class name: `ToDetailerPipeSDXL`
- Category: `ImpactPack/Pipe`
- Output node: `False`

The ToDetailerPipeSDXL node is designed to transform and refine input data through a series of conditioning and detection processes, preparing it for detailed image generation or enhancement. It leverages multiple models and techniques, including CLIP, VAE, and bounding box detection, to achieve precise and context-aware results.
## Input types
### Required
- **`model`**
    - Specifies the primary model used for generating or refining images, playing a central role in the overall processing pipeline.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`clip`**
    - Defines the CLIP model used for understanding and interpreting the content of images or text, aiding in the alignment of generated content with specified conditions.
    - Comfy dtype: `CLIP`
    - Python dtype: `str`
- **`vae`**
    - Indicates the VAE (Variational Autoencoder) model employed for encoding and decoding images, facilitating the manipulation of image features in latent space.
    - Comfy dtype: `VAE`
    - Python dtype: `str`
- **`positive`**
    - A set of positive conditioning factors that guide the generation or refinement process towards desired attributes or features.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`negative`**
    - A set of negative conditioning factors used to steer the generation or refinement process away from certain attributes or features.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`refiner_model`**
    - Specifies an additional model used for refining the generated or processed images, enhancing their quality or detail.
    - Comfy dtype: `MODEL`
    - Python dtype: `str`
- **`refiner_clip`**
    - Defines an additional CLIP model used for refining the alignment of generated content with specified conditions, enhancing the relevance and accuracy of the output.
    - Comfy dtype: `CLIP`
    - Python dtype: `str`
- **`refiner_positive`**
    - Additional positive conditioning factors for the refinement process, aimed at enhancing specific attributes or features in the refined output.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`refiner_negative`**
    - Additional negative conditioning factors for the refinement process, aimed at reducing or eliminating certain attributes or features in the refined output.
    - Comfy dtype: `CONDITIONING`
    - Python dtype: `str`
- **`bbox_detector`**
    - Specifies the bounding box detector model used for identifying and localizing objects within images, facilitating targeted processing or enhancement.
    - Comfy dtype: `BBOX_DETECTOR`
    - Python dtype: `str`
- **`wildcard`**
    - A dynamic input that allows for the inclusion of custom text or conditions, providing flexibility in the generation or refinement process.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`Select to add LoRA`**
    - Enables the selection of LoRA (Low-Rank Adaptation) techniques to be applied, enhancing the model's adaptability and performance on specific tasks or conditions.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `list`
- **`Select to add Wildcard`**
    - Allows for the selection of custom conditions or modifiers to be added, offering additional customization in the processing pipeline.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `list`
### Optional
- **`sam_model_opt`**
    - Specifies an optional SAM model used for semantic segmentation, contributing to the refinement and detail enhancement processes.
    - Comfy dtype: `SAM_MODEL`
    - Python dtype: `str`
- **`segm_detector_opt`**
    - Defines an optional segmentation detector model used for identifying specific regions or features within images, aiding in targeted processing.
    - Comfy dtype: `SEGM_DETECTOR`
    - Python dtype: `str`
- **`detailer_hook`**
    - An optional hook for integrating custom processing or refinement steps, offering further customization of the pipeline.
    - Comfy dtype: `DETAILER_HOOK`
    - Python dtype: `str`
## Output types
- **`detailer_pipe`**
    - Comfy dtype: `DETAILER_PIPE`
    - The output is a detailer pipe, which encapsulates the refined and processed data, ready for further stages of image generation or enhancement.
    - Python dtype: `tuple`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [FromDetailerPipe_v2](../../ComfyUI-Impact-Pack/Nodes/FromDetailerPipe_v2.md)



## Source code
```python
class ToDetailerPipeSDXL(ToDetailerPipe):
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
                     "model": ("MODEL",),
                     "clip": ("CLIP",),
                     "vae": ("VAE",),
                     "positive": ("CONDITIONING",),
                     "negative": ("CONDITIONING",),
                     "refiner_model": ("MODEL",),
                     "refiner_clip": ("CLIP",),
                     "refiner_positive": ("CONDITIONING",),
                     "refiner_negative": ("CONDITIONING",),
                     "bbox_detector": ("BBOX_DETECTOR", ),
                     "wildcard": ("STRING", {"multiline": True, "dynamicPrompts": False}),
                     "Select to add LoRA": (["Select the LoRA to add to the text"] + folder_paths.get_filename_list("loras"),),
                     "Select to add Wildcard": (["Select the Wildcard to add to the text"],),
                     },
                "optional": {
                    "sam_model_opt": ("SAM_MODEL",),
                    "segm_detector_opt": ("SEGM_DETECTOR",),
                    "detailer_hook": ("DETAILER_HOOK",),
                }}

```
