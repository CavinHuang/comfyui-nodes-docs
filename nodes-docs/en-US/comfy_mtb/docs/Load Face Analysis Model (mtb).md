---
tags:
- Face
---

# Load Face Analysis Model (mtb)
## Documentation
- Class name: `Load Face Analysis Model (mtb)`
- Category: `mtb/facetools`
- Output node: `False`

This node is designed to load a face analysis model, facilitating the analysis of facial features and characteristics within images. It supports the selection of different model types to accommodate various analysis needs.
## Input types
### Required
- **`faceswap_model`**
    - Specifies the model to be used for face analysis. The choice of model affects the accuracy and type of analysis performed.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`face_analysis_model`**
    - Comfy dtype: `FACE_ANALYSIS_MODEL`
    - The loaded face analysis model, ready for performing facial feature analysis.
    - Python dtype: `insightface.app.FaceAnalysis`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class MTB_LoadFaceAnalysisModel:
    """Loads a face analysis model"""

    models = []

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "faceswap_model": (
                    ["antelopev2", "buffalo_l", "buffalo_m", "buffalo_sc"],
                    {"default": "buffalo_l"},
                ),
            },
        }

    RETURN_TYPES = ("FACE_ANALYSIS_MODEL",)
    FUNCTION = "load_model"
    CATEGORY = "mtb/facetools"

    def load_model(self, faceswap_model: str):
        if faceswap_model == "antelopev2":
            download_antelopev2()

        face_analyser = insightface.app.FaceAnalysis(
            name=faceswap_model,
            root=get_model_path("insightface").as_posix(),
        )
        return (face_analyser,)

```
