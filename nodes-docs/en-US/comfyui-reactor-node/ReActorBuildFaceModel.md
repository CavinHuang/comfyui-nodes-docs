---
tags:
- Face
- ReActorFace
---

# Build Blended Face Model 🌌 ReActor
## Documentation
- Class name: `ReActorBuildFaceModel`
- Category: `🌌 ReActor`
- Output node: `True`

This node is designed to construct a face model from a provided image, utilizing face detection and analysis to identify and extract facial features. It aims to create a detailed face model that can be used for various face manipulation tasks within the ReActor framework.
## Input types
### Required
- **`save_mode`**
    - Indicates whether the face model should be saved after creation, affecting the workflow of model handling and storage.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`send_only`**
    - This parameter determines if only the face model's name should be sent back, without the actual model data, to optimize data transfer.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
- **`face_model_name`**
    - The name under which the face model will be saved. This parameter is essential for identifying and retrieving the model in subsequent operations.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`compute_method`**
    - Defines the method used for computing the face model, allowing for flexibility in the face detection and analysis process.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`images`**
    - A batch of images from which to build face models, enabling the processing of multiple images in a single operation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[Image.Image]`
- **`face_models`**
    - A collection of existing face models to be processed or analyzed further, providing a way to handle multiple models efficiently.
    - Comfy dtype: `FACE_MODEL`
    - Python dtype: `List[Dict[str, Any]]`
## Output types
- **`face_model`**
    - Comfy dtype: `FACE_MODEL`
    - The constructed face model or an error message if the process fails.
    - Python dtype: `Dict[str, Any]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Built-in or C extension class, unable to automatically detect source code
```
