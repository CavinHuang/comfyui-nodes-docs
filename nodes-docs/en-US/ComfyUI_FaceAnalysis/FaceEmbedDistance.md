---
tags:
- Face
---

# Face Embeds Distance
## Documentation
- Class name: `FaceEmbedDistance`
- Category: `FaceAnalysis`
- Output node: `False`

The FaceEmbedDistance node is designed to extract facial embeddings from an image using specified face analysis models. It supports different libraries for face detection and embedding extraction, providing a flexible approach to obtaining normalized face embeddings or descriptors for further analysis.
## Input types
### Required
- **`analysis_models`**
    - The analysis models input specifies the face analysis models to be used for detecting faces and extracting embeddings. It is essential for configuring the node to use the appropriate library and models for face analysis.
    - Comfy dtype: `ANALYSIS_MODELS`
    - Python dtype: `dict`
- **`reference`**
    - The reference input is an image against which the face embeddings are to be compared. It is used in the context of analyzing the distance or similarity between faces.
    - Comfy dtype: `IMAGE`
    - Python dtype: `numpy.ndarray`
- **`image`**
    - The image input is the primary data the node processes to extract facial embeddings. It plays a crucial role in the face analysis process, as the quality and characteristics of the image directly influence the accuracy and effectiveness of the embedding extraction.
    - Comfy dtype: `IMAGE`
    - Python dtype: `numpy.ndarray`
- **`filter_thresh_eucl`**
    - This input sets the Euclidean distance threshold for filtering face embeddings. It is used to determine the similarity between faces based on Euclidean distance.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`filter_thresh_cos`**
    - This input sets the cosine similarity threshold for filtering face embeddings. It is used to determine the similarity between faces based on cosine similarity.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`filter_best`**
    - This input specifies the number of best matches to retain after filtering based on the specified thresholds. It allows for narrowing down the most similar faces.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`generate_image_overlay`**
    - This boolean input determines whether to generate an overlay image showing the comparison results between the reference and target faces. It enhances the visual analysis of face similarity.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`IMAGE`**
    - Comfy dtype: `IMAGE`
    - The output image may include visual representations of the analysis, such as overlays or annotations to indicate detected faces or similarities.
    - Python dtype: `numpy.ndarray or None`
- **`euclidean`**
    - Comfy dtype: `FLOAT`
    - The Euclidean distance output provides a measure of the similarity between the analyzed faces based on Euclidean distance. It is crucial for tasks requiring precise face comparison.
    - Python dtype: `list of float`
- **`cosine`**
    - Comfy dtype: `FLOAT`
    - The cosine similarity output provides a measure of the similarity between the analyzed faces based on cosine similarity. It is used for comparing the orientation of the face embeddings in the vector space.
    - Python dtype: `list of float`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class FaceEmbedDistance:
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "analysis_models": ("ANALYSIS_MODELS", ),
                "reference": ("IMAGE", ),
                "image": ("IMAGE", ),
                "filter_thresh_eucl": ("FLOAT", { "default": 1.0, "min": 0.001, "max": 2.0, "step": 0.001 }),
                "filter_thresh_cos": ("FLOAT", { "default": 1.0, "min": 0.001, "max": 2.0, "step": 0.001 }),
                "filter_best": ("INT", { "default": 0, "min": 0, "max": 4096, "step": 1 }),
                "generate_image_overlay": ("BOOLEAN", { "default": True }),
            },
        }

    RETURN_TYPES = ("IMAGE", "FLOAT", "FLOAT")
    RETURN_NAMES = ("IMAGE", "euclidean", "cosine")
    OUTPUT_IS_LIST = (False, True, True)
    FUNCTION = "analize"
    CATEGORY = "FaceAnalysis"

    def analize(self, analysis_models, reference, image, filter_thresh_eucl=1.0, filter_thresh_cos=1.0, filter_best=0, generate_image_overlay=True):
        if generate_image_overlay:
            font = ImageFont.truetype(os.path.join(os.path.dirname(os.path.realpath(__file__)), "Inconsolata.otf"), 32)
            background_color = ImageColor.getrgb("#000000AA")
            txt_height = font.getmask("Q").getbbox()[3] + font.getmetrics()[1]

        self.analysis_models = analysis_models

        ref = []
        for i in reference:
            ref_emb = self.get_descriptor(np.array(T.ToPILImage()(i.permute(2, 0, 1).cpu()).convert('RGB')))
            if ref_emb is not None:
                ref.append(torch.from_numpy(ref_emb))
        
        if ref == []:
            raise Exception('No face detected in reference image')

        ref = torch.stack(ref)
        ref = np.array(torch.mean(ref, dim=0))

        out = []
        out_eucl = []
        out_cos = []
        
        for i in image:
            img = np.array(T.ToPILImage()(i.permute(2, 0, 1).cpu()).convert('RGB'))

            img = self.get_descriptor(img)

            if img is None: # No face detected
                eucl_dist = 1.0
                cos_dist = 1.0
            else:
                if np.array_equal(ref, img): # Same face
                    eucl_dist = 0.0
                    cos_dist = 0.0
                else:
                    eucl_dist = np.float64(np.linalg.norm(ref - img))
                    cos_dist = 1 - np.dot(ref, img) / (np.linalg.norm(ref) * np.linalg.norm(img))
            
            if eucl_dist <= filter_thresh_eucl and cos_dist <= filter_thresh_cos:
                print(f"\033[96mFace Analysis: Euclidean: {eucl_dist}, Cosine: {cos_dist}\033[0m")

                if generate_image_overlay:
                    tmp = T.ToPILImage()(i.permute(2, 0, 1)).convert('RGBA')
                    txt = Image.new('RGBA', (image.shape[2], txt_height), color=background_color)
                    draw = ImageDraw.Draw(txt)
                    draw.text((0, 0), f"EUC: {round(eucl_dist, 3)} | COS: {round(cos_dist, 3)}", font=font, fill=(255, 255, 255, 255))
                    composite = Image.new('RGBA', tmp.size)
                    composite.paste(txt, (0, tmp.height - txt.height))
                    composite = Image.alpha_composite(tmp, composite)
                    out.append(T.ToTensor()(composite).permute(1, 2, 0))
                else:
                    out.append(i)

                out_eucl.append(eucl_dist)
                out_cos.append(cos_dist)

        if not out:
            raise Exception('No image matches the filter criteria.')

        # filter out the best matches
        if filter_best > 0:
            out = np.array(out)
            out_eucl = np.array(out_eucl)
            out_cos = np.array(out_cos)
            idx = np.argsort((out_eucl + out_cos) / 2)
            out = torch.from_numpy(out[idx][:filter_best])
            out_eucl = out_eucl[idx][:filter_best].tolist()
            out_cos = out_cos[idx][:filter_best].tolist()

        if isinstance(out, list):
            out = torch.stack(out)

        return(out, out_eucl, out_cos,)
    
    def get_descriptor(self, image):
        embeds = None

        if self.analysis_models["library"] == "insightface":
            faces = self.analysis_models["detector"].get(image)
            if len(faces) > 0:
                embeds = faces[0].normed_embedding
        else:
            faces = self.analysis_models["detector"](image)
            if len(faces) > 0:
                shape = self.analysis_models["shape_predict"](image, faces[0])
                embeds = np.array(self.analysis_models["face_recog"].compute_face_descriptor(image, shape))

        return embeds

```
