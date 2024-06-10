---
tags:
- SAM
---

# SAMLoader (Impact)
## Documentation
- Class name: `SAMLoader`
- Category: `ImpactPack`
- Output node: `False`

The SAMLoader node is designed to dynamically load and manage different types of SAM (Spatial Attention Model) models, including ESAM (Efficient SAM) and various Vision Transformer (ViT) models. It handles model initialization, device allocation (CPU or GPU), and ensures the necessary dependencies and extensions are installed for specific model types.
## Input types
### Required
- **`model_name`**
    - Specifies the name of the SAM model to be loaded. This can include 'ESAM' for Efficient SAM models or names indicating different Vision Transformer models like 'vit_h', 'vit_l', 'vit_b'.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`device_mode`**
    - Determines the device (CPU or GPU) on which the model will be loaded and run, with support for automatic device selection based on the model's requirements and system capabilities.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`sam_model`**
    - Comfy dtype: `SAM_MODEL`
    - Returns the loaded SAM model, ready for further operations such as inference. The model is wrapped in a SAMWrapper or ESAMWrapper, depending on the model type, to facilitate device management and prediction.
    - Python dtype: `Union[SAMWrapper, ESAMWrapper]`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [FaceDetailer](../../ComfyUI-Impact-Pack/Nodes/FaceDetailer.md)
    - [ToDetailerPipe](../../ComfyUI-Impact-Pack/Nodes/ToDetailerPipe.md)
    - [SAMDetectorCombined](../../ComfyUI-Impact-Pack/Nodes/SAMDetectorCombined.md)
    - [ToDetailerPipeSDXL](../../ComfyUI-Impact-Pack/Nodes/ToDetailerPipeSDXL.md)
    - Reroute
    - [ImpactSimpleDetectorSEGS](../../ComfyUI-Impact-Pack/Nodes/ImpactSimpleDetectorSEGS.md)
    - [ImpactSimpleDetectorSEGS_for_AD](../../ComfyUI-Impact-Pack/Nodes/ImpactSimpleDetectorSEGS_for_AD.md)
    - [GroundingDinoSAMSegment (segment anything)](../../comfyui_segment_anything/Nodes/GroundingDinoSAMSegment (segment anything).md)



## Source code
```python
class SAMLoader:
    @classmethod
    def INPUT_TYPES(cls):
        models = [x for x in folder_paths.get_filename_list("sams") if 'hq' not in x]
        return {
            "required": {
                "model_name": (models + ['ESAM'], ),
                "device_mode": (["AUTO", "Prefer GPU", "CPU"],),
            }
        }

    RETURN_TYPES = ("SAM_MODEL", )
    FUNCTION = "load_model"

    CATEGORY = "ImpactPack"

    def load_model(self, model_name, device_mode="auto"):
        if model_name == 'ESAM':
            if 'ESAM_ModelLoader_Zho' not in nodes.NODE_CLASS_MAPPINGS:
                try_install_custom_node('https://github.com/ZHO-ZHO-ZHO/ComfyUI-YoloWorld-EfficientSAM',
                                        "To use 'ESAM' model, 'ComfyUI-YoloWorld-EfficientSAM' extension is required.")
                raise Exception("'ComfyUI-YoloWorld-EfficientSAM' node isn't installed.")

            esam_loader = nodes.NODE_CLASS_MAPPINGS['ESAM_ModelLoader_Zho']()

            if device_mode == 'CPU':
                esam = esam_loader.load_esam_model('CPU')[0]
            else:
                device_mode = 'CUDA'
                esam = esam_loader.load_esam_model('CUDA')[0]

            sam_obj = core.ESAMWrapper(esam, device_mode)
            esam.sam_wrapper = sam_obj
            
            print(f"Loads EfficientSAM model: (device:{device_mode})")
            return (esam, )

        modelname = folder_paths.get_full_path("sams", model_name)

        if 'vit_h' in model_name:
            model_kind = 'vit_h'
        elif 'vit_l' in model_name:
            model_kind = 'vit_l'
        else:
            model_kind = 'vit_b'

        sam = sam_model_registry[model_kind](checkpoint=modelname)
        size = os.path.getsize(modelname)
        safe_to = core.SafeToGPU(size)

        # Unless user explicitly wants to use CPU, we use GPU
        device = comfy.model_management.get_torch_device() if device_mode == "Prefer GPU" else "CPU"

        if device_mode == "Prefer GPU":
            safe_to.to_device(sam, device)

        is_auto_mode = device_mode == "AUTO"

        sam_obj = core.SAMWrapper(sam, is_auto_mode=is_auto_mode, safe_to_gpu=safe_to)
        sam.sam_wrapper = sam_obj

        print(f"Loads SAM model: {modelname} (device:{device_mode})")
        return (sam, )

```
