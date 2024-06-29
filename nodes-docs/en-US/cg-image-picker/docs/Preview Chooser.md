---
tags:
- Image
---

# Preview Chooser
## Documentation
- Class name: `Preview Chooser`
- Category: `image_chooser`
- Output node: `False`

The Preview Chooser node is designed to display a set of images to the user, allowing them to visually inspect and select one or more images to proceed with in the workflow. This node integrates a user interaction step into the data processing pipeline, facilitating decision-making based on visual information.
## Input types
### Required
- **`mode`**
    - The 'mode' parameter determines the operational mode of the node, affecting how user selections are processed and how the node behaves in different scenarios.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`count`**
    - The 'count' parameter specifies the number of images to select or process, allowing for control over the quantity of output based on user input or predefined settings.
    - Comfy dtype: `INT`
    - Python dtype: `int`
### Optional
- **`images`**
    - The 'images' parameter represents the collection of images to be displayed for user selection. It plays a crucial role in the node's operation by providing the visual content that users interact with to make their selections.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`latents`**
    - The 'latents' parameter refers to the latent representations associated with the images. It is used to carry forward the selected images' latent information through the workflow, enabling further processing or analysis.
    - Comfy dtype: `LATENT`
    - Python dtype: `torch.Tensor`
- **`masks`**
    - The 'masks' parameter provides optional mask information for the images, which can be used for advanced selection or processing scenarios where specific parts of images are of interest.
    - Comfy dtype: `MASK`
    - Python dtype: `Optional[torch.Tensor]`
## Output types
- **`images`**
    - Comfy dtype: `IMAGE`
    - Returns the images selected by the user.
    - Python dtype: `torch.Tensor`
- **`latents`**
    - Comfy dtype: `LATENT`
    - Returns the latent representations of the selected images.
    - Python dtype: `torch.Tensor`
- **`masks`**
    - Comfy dtype: `MASK`
    - Returns the mask information for the selected images, if applicable.
    - Python dtype: `Optional[torch.Tensor]`
- **`selected`**
    - Comfy dtype: `STRING`
    - Provides a string or identifier for the selected images, facilitating tracking and further processing.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes:
    - [ImageBlend](../../Comfy/Nodes/ImageBlend.md)
    - Mute / Bypass Repeater (rgthree)
    - [PreviewImage](../../Comfy/Nodes/PreviewImage.md)
    - [IterativeImageUpscale](../../ComfyUI-Impact-Pack/Nodes/IterativeImageUpscale.md)
    - [ImageUpscaleWithModel](../../Comfy/Nodes/ImageUpscaleWithModel.md)



## Source code
```python
class PreviewAndChoose(PreviewImage):
    RETURN_TYPES = ("IMAGE","LATENT","MASK","STRING")
    RETURN_NAMES = ("images","latents","masks","selected")
    FUNCTION = "func"
    CATEGORY = "image_chooser"
    INPUT_IS_LIST=True
    OUTPUT_NODE = False
    last_ic = {}
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "mode" : (["Always pause", "Repeat last selection", "Only pause if batch", "Progress first pick", "Pass through", "Take First n", "Take Last n"],{}),
				"count": ("INT", { "default": 1, "min": 1, "max": 999, "step": 1 }),
            },
            "optional": {"images": ("IMAGE", ), "latents": ("LATENT", ), "masks": ("MASK", ) },
            "hidden": {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO", "id":"UNIQUE_ID"},
        }

    @classmethod
    def IS_CHANGED(cls, mode, id, **kwargs):
        if (mode[0]!="Repeat last selection" or not id[0] in cls.last_ic): cls.last_ic[id[0]] = random.random()
        return cls.last_ic[id[0]]

    def func(self, id, **kwargs):
        # mode doesn't exist in subclass
        self.count = int(kwargs.pop('count', [1,])[0])
        mode = kwargs.pop('mode',["Always pause",])[0]
        if mode=="Repeat last selection":
            print("Here despite 'Repeat last selection' - treat as 'Always pause'")
            mode = "Always pause"
        if mode=="Always pause":
            # pretend it was Repeat last so that the prompt matches if that is selected next time.
            # UGH
            kwargs['prompt'][0][id[0]]['inputs']['mode'] = "Repeat last selection"
        id = id[0]
        if id not in MessageHolder.stash:
            MessageHolder.stash[id] = {}
        my_stash = MessageHolder.stash[id]

        # enable stashing. If images is None, we are operating in read-from-stash mode
        if 'images' in kwargs:
            my_stash['images']  = kwargs['images']
            my_stash['latents'] = kwargs.get('latents', None)
            my_stash['masks']   = kwargs.get('masks', None)
        else:
            kwargs['images']  = my_stash.get('images', None)
            kwargs['latents'] = my_stash.get('latents', None)
            kwargs['masks']   = my_stash.get('masks', None)
            
        if (kwargs['images'] is None):
            return (None, None, None, "")
        
        # convert list to batch
        images_in         = torch.cat(kwargs.pop('images'))
        latents_in        = kwargs.pop('latents', None)
        masks_in          = torch.cat(kwargs.get('masks')) if kwargs.get('masks', None) is not None else None
        kwargs.pop('masks', None)
        latent_samples_in = torch.cat(list(l['samples'] for l in latents_in)) if latents_in is not None else None
        self.batch        = images_in.shape[0]

        # any other parameters shouldn't be lists any more...
        for x in kwargs: kwargs[x] = kwargs[x][0]
 
        # call PreviewImage base
        ret = self.save_images(images=images_in, **kwargs)

        # send the images to view
        PromptServer.instance.send_sync("early-image-handler", {"id": id, "urls":ret['ui']['images']})

        # wait for selection
        try:
            is_block_condition = (mode == "Always pause" or mode == "Progress first pick" or self.batch > 1)
            is_blocking_mode = (mode not in ["Pass through", "Take First n", "Take Last n"])
            selections = MessageHolder.waitForMessage(id, asList=True) if (is_blocking_mode and is_block_condition) else [0]
        except Cancelled:
            raise InterruptProcessingException()
            #return (None, None,)
        
        return self.batch_up_selections(images_in=images_in, latent_samples_in=latent_samples_in, masks_in=masks_in, selections=selections, mode=mode)

    def tensor_bundle(self, tensor_in:torch.Tensor, picks):
        if tensor_in is not None and len(picks):
            batch = tensor_in.shape[0]
            return torch.cat(tuple([tensor_in[(x)%batch].unsqueeze_(0) for x in picks])).reshape([-1]+list(tensor_in.shape[1:]))
        else:
            return None
    
    def latent_bundle(self, latent_samples_in:torch.Tensor, picks):
        if (latent_samples_in is not None and len(picks)):
            return { "samples" : self.tensor_bundle(latent_samples_in, picks) }
        else:
            return None
    
    def batch_up_selections(self, images_in:torch.Tensor, latent_samples_in:torch.Tensor, masks_in:torch.Tensor, selections, mode):
        if (mode=="Pass through"):
            chosen = range(0, self.batch)
        elif (mode=="Take First n"):
            end = self.count if self.batch >= self.count else self.batch
            chosen = range(0, end)
        elif (mode=="Take Last n"):
            start = self.batch - self.count if self.batch - self.count >= 0 else 0
            chosen = range(start, self.batch)
        else:
            chosen = [x for x in selections if x>=0]

        return (self.tensor_bundle(images_in, chosen), self.latent_bundle(latent_samples_in, chosen), self.tensor_bundle(masks_in, chosen), ",".join(str(x) for x in chosen), )

```
