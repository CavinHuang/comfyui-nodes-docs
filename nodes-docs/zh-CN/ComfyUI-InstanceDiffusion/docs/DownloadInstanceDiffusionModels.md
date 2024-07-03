
# Documentation
- Class name: DownloadInstanceDiffusionModels
- Category: instance/loaders
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

DownloadInstanceDiffusionModels节点负责下载并加载实例扩散过程所需的模型,包括PositionNet、Fusers和ScaleU模型。它确保所需模型在本地可用,如果不存在则下载,然后将它们加载到内存中以用于实例扩散任务。该节点简化了模型准备过程,为后续的实例扩散操作奠定基础。

# Input types
## Required
- use_segs
    - 该参数指示PositionNet模型是否应使用分割信息,影响模型的准备和加载方式。当设置为True时,模型将考虑分割数据,可能提供更精细的位置信息。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- fusers_scale
    - 指定应用于Fusers模型的缩放因子,影响模型的准备和加载,以根据所需的缩放调整其输出。这允许用户控制Fusers模型的输出规模,适应不同的应用场景。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- positionnet
    - 返回加载好的PositionNet模型,已准备就绪可用于实例扩散任务。该模型专门用于处理位置相关的信息,对于生成高质量的实例扩散结果至关重要。
    - Comfy dtype: POSITIONNET
    - Python dtype: Dict[str, Any]
- fusers
    - 提供加载好的Fusers模型列表,根据指定的缩放进行调整,准备集成到实例扩散过程中。这些模型负责融合不同特征,增强生成结果的质量和多样性。
    - Comfy dtype: FUSERS
    - Python dtype: Dict[str, Any]
- scaleu
    - 提供加载好的ScaleU模型,使其可用于增强实例扩散能力。ScaleU模型专门处理不同尺度的特征,有助于生成更加细致和准确的实例扩散结果。
    - Comfy dtype: SCALEU
    - Python dtype: Dict[str, Any]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class DownloadInstanceDiffusionModels:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "use_segs": ("BOOLEAN", {"default": True}),
            "fusers_scale": ("FLOAT", {"default": 1.0, "min": 0.0, "max": 10.0, "step": 0.01}),
        }}

    RETURN_TYPES = ("POSITIONNET", "FUSERS", "SCALEU", )
    FUNCTION = "load_model"

    CATEGORY = "instance/loaders"

    def load_model(self, use_segs: bool, fusers_scale: float):
        repo_id = "logtd/instance_diffusion"
        instance_models_folder = os.path.join(folder_paths.models_dir, constants.INSTANCE_MODELS_DIR)

        models_to_download = [
            ("position_net", constants.INSTANCE_POSITIONNET_DIR, "position_net.ckpt"),
            ("fusers", constants.INSTANCE_FUSERS_DIR, "fusers.ckpt"),
            ("scaleu", constants.INSTANCE_SCALEU_DIR, "scaleu.ckpt")
        ]

        for model_name, model_folder, model_file in models_to_download:
            model_folder_path = os.path.join(instance_models_folder, model_folder)
            model_file_path = os.path.join(model_folder_path, model_file)

            if not os.path.exists(model_file_path):
                print(f"Selected model: {model_file_path} not found, downloading...")
                allow_patterns = [f"*{model_name}*"]
                snapshot_download(repo_id=repo_id, 
                                  allow_patterns=allow_patterns, 
                                  local_dir=model_folder_path, 
                                  local_dir_use_symlinks=False
                                  )
                
        positionnet_file = os.path.join(instance_models_folder, constants.INSTANCE_POSITIONNET_DIR, "position_net.ckpt")
        fusers_file = os.path.join(instance_models_folder, constants.INSTANCE_FUSERS_DIR, "fusers.ckpt")
        scaleu_file = os.path.join(instance_models_folder, constants.INSTANCE_SCALEU_DIR, "scaleu.ckpt")

        pos_checkpoint = comfy.utils.load_torch_file(positionnet_file, safe_load=True)
        params = get_positionnet_default_params()
        params["use_segs"] = use_segs
        model = prepare_positionnet(pos_checkpoint, params)
        positionnet = {
            'model': model,
        }

        fusers_checkpoint = comfy.utils.load_torch_file(fusers_file, safe_load=True)
        fusers_list = prepare_fusers(fusers_checkpoint, fusers_scale)
        fusers = {
            'model_list': fusers_list
        }
        scaleu_checkpoint = comfy.utils.load_torch_file(scaleu_file, safe_load=True)
        scaleu_list = prepare_scaleu_nets(scaleu_checkpoint)
        scaleu = {
            'model_list': scaleu_list
        }
        return (positionnet, fusers, scaleu)

```
