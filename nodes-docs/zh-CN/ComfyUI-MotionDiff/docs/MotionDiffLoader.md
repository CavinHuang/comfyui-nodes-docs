
# Documentation
- Class name: MotionDiffLoader
- Category: MotionDiff
- Output node: False

MotionDiffLoader节点用于加载和初始化运动扩散模型（Motion Diffusion Model，MDM）及其相关的CLIP包装器，基于指定的模型数据集。该节点在为后续处理或推理任务准备运动生成模型方面发挥着至关重要的作用，确保它们正确配置并包含必要的数据集信息。

# Input types
## Required
- model_dataset
    - 指定要加载的数据集模型。此选择决定了运动扩散模型及其CLIP包装器的配置，进而影响运动生成的行为和性能。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- md_model
    - 返回一个经过包装的运动扩散模型实例，可用于运动生成任务。
    - Comfy dtype: MD_MODEL
    - Python dtype: MotionDiffModelWrapper
- md_clip
    - 返回一个为所加载的运动扩散模型配置的CLIP包装器，用于实现基于文本条件的运动生成。
    - Comfy dtype: MD_CLIP
    - Python dtype: MotionDiffCLIPWrapper


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class MotionDiffLoader:
    @classmethod
    def INPUT_TYPES(s):
        global model_dataset_dict
        model_dataset_dict = get_model_dataset_dict()
        return {
            "required": {
                "model_dataset": (
                    list(model_dataset_dict.keys()), 
                    { "default": "-human_ml3d" }
                )
            },
        }

    RETURN_TYPES = ("MD_MODEL", "MD_CLIP")
    CATEGORY = "MotionDiff"
    FUNCTION = "load_mdm"

    def load_mdm(self, model_dataset):
        global model_dataset_dict
        if model_dataset_dict is None:
            model_dataset_dict = get_model_dataset_dict() #In case of API users
        model_config = model_dataset_dict[model_dataset]()
        mdm = create_mdm_model(model_config)
        return (MotionDiffModelWrapper(mdm, dataset=model_config.dataset), MotionDiffCLIPWrapper(mdm))

```
