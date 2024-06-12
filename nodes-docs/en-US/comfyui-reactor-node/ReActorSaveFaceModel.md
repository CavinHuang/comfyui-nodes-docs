---
tags:
- Face
- ReActorFace
---

# Save Face Model 🌌 ReActor
## Documentation
- Class name: `ReActorSaveFaceModel`
- Category: `🌌 ReActor`
- Output node: `True`

This node is designed to save a face model after processing an image or a set of images. It involves analyzing faces within the provided images, selecting a specific face based on an index, and saving the analyzed face model to a specified location. The node supports operations such as building a face model from an image, selecting a face from the model, and saving the selected face model for future use.
## Input types
### Required
- **`save_mode`**
    - Indicates whether the face model should be saved. This affects the node's operation by either proceeding with saving the model or skipping this step.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`face_model_name`**
    - The name under which the face model will be saved. This name is used to create the file name for the saved model.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`select_face_index`**
    - The index of the face to select from the analyzed faces in the image. This allows for specific face selection within a group of detected faces.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`image`**
    - The image from which the face model will be built. This is optional if a pre-analyzed face model is provided.
    - Comfy dtype: `IMAGE`
    - Python dtype: `Optional[torch.Tensor]`
- **`face_model`**
    - A pre-analyzed face model that can be saved directly without further analysis. This is optional if an image is provided for analysis.
    - Comfy dtype: `FACE_MODEL`
    - Python dtype: `Optional[dict]`
## Output types
The node doesn't have output types
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
# Built-in or C extension class, unable to automatically detect source code
```
