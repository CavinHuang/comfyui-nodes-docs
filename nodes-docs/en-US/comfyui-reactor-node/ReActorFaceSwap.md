---
tags:
- Face
- ReActorFace
---

# ReActor 🌌 Fast Face Swap
## Documentation
- Class name: `ReActorFaceSwap`
- Category: `🌌 ReActor`
- Output node: `False`

The ReActorFaceSwap node specializes in rapidly swapping faces within images, leveraging advanced face detection and swapping algorithms to achieve high-quality results. This node is designed to seamlessly integrate face swap functionalities into workflows, making it ideal for applications requiring dynamic face replacement or augmentation.
## Input types
### Required
- **`enabled`**
    - A flag to enable or disable the face swapping process, allowing for conditional execution within a workflow.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`input_image`**
    - The image that will either serve as the source or target in the face swapping process, depending on the operation mode.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Image.Image`
- **`swap_model`**
    - The specific model used for swapping faces, which determines the quality and style of the swap.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`facedetection`**
    - Indicates whether face detection should be performed as part of the swapping process, enabling the identification and selection of faces.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
- **`face_restore_model`**
    - The model used for restoring faces post-swap, ensuring high-quality and natural-looking results.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`face_restore_visibility`**
    - Controls the visibility of the restoration process in the output, allowing for fine-tuning of the final image appearance.
    - Comfy dtype: `FLOAT`
    - Python dtype: `bool`
- **`codeformer_weight`**
    - The weight of the CodeFormer model in the restoration process, balancing between the original and enhanced face features.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`detect_gender_input`**
    - Determines whether to detect the gender of faces in the input image, aiding in more accurate face swapping.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
- **`detect_gender_source`**
    - Specifies whether to detect the gender of the source face, used in gender-specific swapping scenarios.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `bool`
- **`input_faces_index`**
    - Indices of faces in the input image to be considered for swapping, allowing for selective processing.
    - Comfy dtype: `STRING`
    - Python dtype: `List[int]`
- **`source_faces_index`**
    - Indices of faces in the source image for swapping, enabling targeted face replacement.
    - Comfy dtype: `STRING`
    - Python dtype: `List[int]`
- **`console_log_level`**
    - Sets the verbosity level of console logs during the swapping process, aiding in debugging and monitoring.
    - Comfy dtype: `COMBO[INT]`
    - Python dtype: `str`
### Optional
- **`source_image`**
    - The source image providing the face(s) for swapping, central to the face replacement operation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Image.Image`
- **`face_model`**
    - Specifies the face detection model to be used, impacting the accuracy of face identification.
    - Comfy dtype: `FACE_MODEL`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The resulting image after the face swapping operation, showcasing the swapped faces.
    - Python dtype: `Image.Image`
- **`face_model`**
    - Comfy dtype: `FACE_MODEL`
    - The face model used in the process, potentially updated based on the operation's requirements.
    - Python dtype: `str`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)
    - [UltimateSDUpscale](../../ComfyUI_UltimateSDUpscale/Nodes/UltimateSDUpscale.md)
    - [VAEEncodeTiled](../../Comfy/Nodes/VAEEncodeTiled.md)
    - [FaceDetailer](../../ComfyUI-Impact-Pack/Nodes/FaceDetailer.md)
    - [UltimateSDUpscaleNoUpscale](../../ComfyUI_UltimateSDUpscale/Nodes/UltimateSDUpscaleNoUpscale.md)
    - SaveVideo
    - [VHS_VideoCombine](../../ComfyUI-VideoHelperSuite/Nodes/VHS_VideoCombine.md)
    - [Image Lucy Sharpen](../../was-node-suite-comfyui/Nodes/Image Lucy Sharpen.md)
    - [ImpactMakeImageList](../../ComfyUI-Impact-Pack/Nodes/ImpactMakeImageList.md)
    - [ImageScaleBy](../../Comfy/Nodes/ImageScaleBy.md)



## Source code
```python
# Built-in or C extension class, unable to automatically detect source code
```
