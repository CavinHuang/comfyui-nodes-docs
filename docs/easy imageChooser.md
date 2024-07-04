
# Documentation
- Class name: easy imageChooser
- Category: EasyUse/Image
- Output node: True
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

easy imageChooser节点为用户提供了从给定图像批次中选择特定图像的功能。它集成了用户界面组件来显示图像并捕获用户的选择，从而简化了图像处理任务的工作流程。这个节点通过允许用户直观地选择感兴趣的图像，大大提高了图像处理和分析的效率。

# Input types
## Optional
- images
    - images参数代表用户可以选择的图像批次。它对节点的执行至关重要，因为它决定了哪些图像可供用户选择，从而直接影响用户界面中显示的视觉内容。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor

# Output types
- image
    - image输出参数返回用户选择的图像的张量。这些选定的图像可以用于后续的处理或分析，使工作流程更加灵活和高效。
    - Comfy dtype: IMAGE
    - Python dtype: torch.Tensor
- ui
    - ui输出参数包含用户界面元素，特别是用户选择的图像。它在将选择结果反馈给用户或后续处理过程中起着关键作用，确保用户的选择能够准确地传递到工作流程的下一个阶段。


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class imageChooser(PreviewImage):
  @classmethod
  def INPUT_TYPES(self):
    return {
      "required":{

      },
      "optional": {
        "images": ("IMAGE",),
      },
      "hidden": {"prompt": "PROMPT", "my_unique_id": "UNIQUE_ID"},
    }

  RETURN_TYPES = ("IMAGE",)
  RETURN_NAMES = ("image",)
  FUNCTION = "chooser"
  OUTPUT_NODE = True
  INPUT_IS_LIST = True
  CATEGORY = "EasyUse/Image"

  last_ic = {}
  @classmethod
  def IS_CHANGED(cls, my_unique_id, **kwargs):
    return cls.last_ic[my_unique_id[0]]

  def tensor_bundle(self, tensor_in: torch.Tensor, picks):
    if tensor_in is not None and len(picks):
      batch = tensor_in.shape[0]
      return torch.cat(tuple([tensor_in[(x) % batch].unsqueeze_(0) for x in picks])).reshape(
        [-1] + list(tensor_in.shape[1:]))
    else:
      return None

  def chooser(self, prompt=None, my_unique_id=None, **kwargs):

    id = my_unique_id[0]
    if id not in ChooserMessage.stash:
      ChooserMessage.stash[id] = {}
    my_stash = ChooserMessage.stash[id]

    # enable stashing. If images is None, we are operating in read-from-stash mode
    if 'images' in kwargs:
      my_stash['images'] = kwargs['images']
    else:
      kwargs['images'] = my_stash.get('images', None)

    if (kwargs['images'] is None):
      return (None, None, None, "")

    images_in = torch.cat(kwargs.pop('images'))
    self.batch = images_in.shape[0]
    for x in kwargs: kwargs[x] = kwargs[x][0]
    result = self.save_images(images=images_in, prompt=prompt)

    images = result['ui']['images']
    PromptServer.instance.send_sync("easyuse-image-choose", {"id": id, "urls": images})

    # wait for selection
    try:
      selections = ChooserMessage.waitForMessage(id, asList=True)
      choosen = [x for x in selections if x >= 0] if len(selections)>1 else [0]
    except ChooserCancelled:
      raise comfy.model_management.InterruptProcessingException()

    return {"ui": {"images": images},
              "result": (self.tensor_bundle(images_in, choosen),)}

```
