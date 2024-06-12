---
tags:
- Face
- ReActorFace
---

# ReActor 🌌 Fast Face Swap [OPTIONS]
## Documentation
- Class name: `ReActorFaceSwapOpt`
- Category: `🌌 ReActor`
- Output node: `False`

This node specializes in offering optimized face swapping capabilities within the ReActor framework, providing users with advanced options for fine-tuning the face swap process. It extends the basic functionality of face swapping by incorporating additional parameters and optimizations to enhance the quality and flexibility of the output.
## Input types
### Required
- **`enabled`**
    - Determines whether the face swap operation is enabled or not, allowing users to toggle the functionality on demand.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`input_image`**
    - The primary image input for the face swap operation, serving as the target for face replacement.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Image`
- **`swap_model`**
    - Specifies the model used for swapping faces, allowing selection from a predefined list of available models.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `list[str]`
- **`facedetection`**
    - Defines the face detection algorithm to be used, offering multiple options to best suit different image conditions.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `list[str]`
- **`face_restore_model`**
    - Selects the model for restoring face details post-swap, enhancing the overall quality of the swapped faces.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `list[str]`
- **`face_restore_visibility`**
    - Adjusts the visibility level of the restored face details, providing control over the blend between the original and restored face features.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`codeformer_weight`**
    - Controls the influence of the CodeFormer model in the face restoration process, balancing between detail enhancement and naturalness.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
### Optional
- **`source_image`**
    - An optional secondary image input for the face swap, acting as the source of faces to be swapped into the primary image.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Image`
- **`face_model`**
    - Optionally specifies a face model to be used in the swap, offering further customization of the swapping process.
    - Comfy dtype: `FACE_MODEL`
    - Python dtype: `FACE_MODEL`
- **`options`**
    - Provides additional configuration options for the face swap operation, allowing for more detailed customization.
    - Comfy dtype: `OPTIONS`
    - Python dtype: `OPTIONS`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output image after the face swap operation, featuring the swapped faces integrated into the original image.
    - Python dtype: `Image`
- **`face_model`**
    - Comfy dtype: `FACE_MODEL`
    - Outputs the face model used in the swapping process, which can be utilized for further operations or analysis.
    - Python dtype: `FACE_MODEL`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
# Built-in or C extension class, unable to automatically detect source code
```
