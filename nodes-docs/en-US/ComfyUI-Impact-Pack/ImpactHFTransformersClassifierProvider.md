# HF Transformers Classifier Provider
## Documentation
- Class name: `ImpactHFTransformersClassifierProvider`
- Category: `ImpactPack/HuggingFace`
- Output node: `False`

This node provides a mechanism to classify text or images using a selection of pre-trained Hugging Face transformer models or a manually specified model. It supports dynamic selection of the model repository based on user input and can operate in different device modes to optimize performance.
## Input types
### Required
- **`preset_repo_id`**
    - Specifies the pre-trained Hugging Face transformer model to use for classification. It can be selected from a predefined list or set to 'Manual repo id' to use a custom model specified by the 'manual_repo_id' parameter.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `Union[List[str], str]`
- **`manual_repo_id`**
    - Allows for the specification of a custom Hugging Face transformer model repository ID when 'preset_repo_id' is set to 'Manual repo id'. This enables the use of models not included in the predefined list.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`device_mode`**
    - Determines the device (CPU or GPU) on which the classification model will run, optimizing for performance or resource availability.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
## Output types
- **`transformers_classifier`**
    - Comfy dtype: `TRANSFORMERS_CLASSIFIER`
    - The output is a Hugging Face transformer classifier pipeline, ready for performing classifications.
    - Python dtype: `transformers.Pipeline`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class HF_TransformersClassifierProvider:
    @classmethod
    def INPUT_TYPES(s):
        global hf_transformer_model_urls
        return {"required": {
                        "preset_repo_id": (hf_transformer_model_urls + ['Manual repo id'],),
                        "manual_repo_id": ("STRING", {"multiline": False}),
                        "device_mode": (["AUTO", "Prefer GPU", "CPU"],),
                     },
                }

    RETURN_TYPES = ("TRANSFORMERS_CLASSIFIER",)
    FUNCTION = "doit"

    CATEGORY = "ImpactPack/HuggingFace"

    def doit(self, preset_repo_id, manual_repo_id, device_mode):
        from transformers import pipeline

        if preset_repo_id == 'Manual repo id':
            url = manual_repo_id
        else:
            url = preset_repo_id

        if device_mode != 'CPU':
            device = comfy.model_management.get_torch_device()
        else:
            device = "cpu"

        classifier = pipeline(model=url, device=device)

        return (classifier,)

```
