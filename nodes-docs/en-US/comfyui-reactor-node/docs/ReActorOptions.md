---
tags:
- Face
- ReActorFace
---

# ReActor 🌌 Options
## Documentation
- Class name: `ReActorOptions`
- Category: `🌌 ReActor`
- Output node: `False`

The ReActorOptions node provides a mechanism for configuring various options related to face swapping operations within the ReActor framework. It allows for the customization of face detection, gender detection, and logging levels to tailor the face swapping process to specific needs.
## Input types
### Required
- **`input_faces_order`**
    - Specifies the order in which input faces are processed, offering several strategies such as left-right, top-bottom, or based on size. This affects the selection and prioritization of faces for operations.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`input_faces_index`**
    - Determines the index of the face to be processed in the input image, enabling targeted operations on specific faces.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`detect_gender_input`**
    - Enables gender detection for the input faces, allowing for gender-specific processing or filtering.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`source_faces_order`**
    - Defines the order for processing source faces, similar to input_faces_order, but applied to the source images.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`source_faces_index`**
    - Specifies the index of the face in the source image to be used, facilitating precise control over the source face selection.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`detect_gender_source`**
    - Activates gender detection for source faces, which can be used to apply gender-specific adjustments or selections.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`console_log_level`**
    - Sets the verbosity level of console logging, allowing users to control the amount of log output generated during operations.
    - Comfy dtype: `COMBO[INT]`
    - Python dtype: `List[int]`
## Output types
- **`options`**
    - Comfy dtype: `OPTIONS`
    - Outputs the configured options for face swapping operations, encapsulating settings like face and gender detection preferences.
    - Python dtype: `Dict[str, Any]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
# Built-in or C extension class, unable to automatically detect source code
```
