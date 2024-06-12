---
tags:
- IPAdapter
- IPAdapterLoader
---

# IPAdapter InsightFace Loader
## Documentation
- Class name: `IPAdapterInsightFaceLoader`
- Category: `ipadapter/loaders`
- Output node: `False`

The IPAdapterInsightFaceLoader node is designed to load the InsightFace model based on the specified provider. It facilitates the integration of facial recognition capabilities into the IPAdapter framework, enabling advanced face analysis and processing functionalities.
## Input types
### Required
- **`provider`**
    - Specifies the computing platform (CPU, CUDA, ROCM) for running the InsightFace model. The choice of provider directly influences the model's performance and compatibility with different hardware environments, ultimately affecting the efficiency and speed of facial recognition tasks.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `Tuple[List[str]]`
## Output types
- **`insightface`**
    - Comfy dtype: `INSIGHTFACE`
    - Returns an instance of the InsightFace model, ready for facial recognition tasks.
    - Python dtype: `Tuple[FaceAnalysis]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class IPAdapterInsightFaceLoader:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "provider": (["CPU", "CUDA", "ROCM"], ),
            },
        }

    RETURN_TYPES = ("INSIGHTFACE",)
    FUNCTION = "load_insightface"
    CATEGORY = "ipadapter/loaders"

    def load_insightface(self, provider):
        return (insightface_loader(provider),)

```
