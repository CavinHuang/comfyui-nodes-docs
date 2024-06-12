---
tags:
- Face
---

# InstantID Face Analysis
## Documentation
- Class name: `InstantIDFaceAnalysis`
- Category: `InstantID`
- Output node: `False`

The InstantIDFaceAnalysis node is designed to load and prepare a face analysis model for further processing. It focuses on initializing the model with the specified provider (CPU, CUDA, ROCM) and setting it up for face detection and analysis tasks.
## Input types
### Required
- **`provider`**
    - Specifies the computation provider for the face analysis model, affecting where the model's computations are executed (e.g., on CPU, CUDA, or ROCM).
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
## Output types
- **`faceanalysis`**
    - Comfy dtype: `FACEANALYSIS`
    - Represents the initialized and prepared face analysis model ready for performing face detection and analysis.
    - Python dtype: `FaceAnalysis`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class InstantIDFaceAnalysis:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "provider": (["CPU", "CUDA", "ROCM"], ),
            },
        }

    RETURN_TYPES = ("FACEANALYSIS",)
    FUNCTION = "load_insight_face"
    CATEGORY = "InstantID"

    def load_insight_face(self, provider):
        model = FaceAnalysis(name="antelopev2", root=INSIGHTFACE_DIR, providers=[provider + 'ExecutionProvider',]) # alternative to buffalo_l
        model.prepare(ctx_id=0, det_size=(640, 640))

        return (model,)

```
