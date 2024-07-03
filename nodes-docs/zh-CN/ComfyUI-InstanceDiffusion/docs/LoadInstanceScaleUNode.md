
# Documentation
- Class name: LoadInstanceScaleUNode
- Category: instance/loaders
- Output node: False

该节点旨在从指定文件名加载ScaleU模型的特定实例。它利用检查点检索机制来加载模型的状态，并为实例扩散过程中的后续使用准备ScaleU网络。

# Input types
## Required
- model_filename
    - 指定要加载的模型文件名。这个参数至关重要，因为它决定了要检索和加载哪个特定的ScaleU模型实例以供使用。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- scaleu
    - 返回一个字典，其中包含ScaleU模型实例的列表，可随时集成到实例扩散框架中。
    - Comfy dtype: SCALEU
    - Python dtype: Dict[str, List[torch.nn.Module]]


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LoadInstanceScaleUNode:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "model_filename": (get_model_list(constants.INSTANCE_SCALEU_DIR),),
        }}

    RETURN_TYPES = ("SCALEU",)
    FUNCTION = "load_model"

    CATEGORY = "instance/loaders"

    def load_model(self, model_filename: str):
        checkpoint = load_checkpoint(
            constants.INSTANCE_SCALEU_DIR, model_filename)
        scaleu_list = prepare_scaleu_nets(checkpoint)
        scaleu = {
            'model_list': scaleu_list
        }
        return (scaleu,)

```
