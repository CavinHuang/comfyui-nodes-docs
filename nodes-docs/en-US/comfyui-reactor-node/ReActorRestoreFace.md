---
tags:
- Face
- FaceRestoration
---

# Restore Face 🌌 ReActor
## Documentation
- Class name: `ReActorRestoreFace`
- Category: `🌌 ReActor`
- Output node: `False`

The ReActorRestoreFace node is designed for restoring faces in images using specified face restoration models. It adjusts the visibility of the restored face based on a given parameter, blending it with the original face to achieve a natural restoration effect.
## Input types
### Required
- **`image`**
    - The image to be processed for face restoration. It serves as the base for detecting faces and applying restoration models.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`facedetection`**
    - The face detection model used to identify faces within the input image, crucial for targeted restoration.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`model`**
    - Specifies the model to be used for face restoration, allowing for different restoration techniques to be applied.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`visibility`**
    - Controls the blend level between the original and restored faces, determining the visibility of the restoration effect.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`codeformer_weight`**
    - A weight parameter specific to the CodeFormer model, influencing the restoration outcome.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The result of the face restoration process, including the restored face image.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
# Built-in or C extension class, unable to automatically detect source code
```
