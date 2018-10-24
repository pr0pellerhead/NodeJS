const bucket = '../bucket/';
const allowedTypes = ['image/jpg', 'image/jpeg', 'image/pjpeg', 'image/gif', 'image/png'];
const allowedDocTypes = ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/pdf', 'text/plain'];
const bucketAvatar = '../bucket/avatar/';
const bucketDocuments = '../bucket/documents/';

var uploadFile = (req, res) => {
    // if (req.files.doc.mimetype.split('/')[0] == 'image'){
    if (allowedTypes.indexOf(req.files.doc.mimetype) > -1) {
        req.files.doc.mv(bucket+req.files.doc.name, (err) => {
            if(err) {
                return res.status(500).send('Could not upload file: ' + err);
            } else {
                return res.status(200).send('OK');
            }
        });
    } else {
        return res.status(400).send('File type not allowed');
    }
}

var uploadAvatar = (req, res) => {
    if (req.files.doc.mimetype.split('/')[0] == 'image'){
        var fileChunks = req.files.doc.name.split('.'); // slika.jpg -> ['slika', 'jpg']
        var name = req.user.uid + '.' + fileChunks[fileChunks.length - 1]; // 4y2783y408874238 + '.' + 'jpg' -> 4y2783y408874238.jpg
        req.files.doc.mv(bucketAvatar + name, (err) => {
            if(err) {
                return res.status(500).send('Could not upload avatar: ' + err);
            } else {
                return res.status(200).send('OK');
            }
        });
    } else {
        return res.status(400).send('File type not allowed');
    }
}

var uploadDocument = (req, res) => {
    if (allowedDocTypes.indexOf(req.files.doc.mimetype) > -1) {
        var name = req.user.uid + '_' + req.files.doc.name;
        var docpath = bucket + 'documents/' + name;
        console.log(docpath);
        req.files.doc.mv(docpath, (err) => { // ./bucket/documents/doc.txt
            if(err) {
                return res.status(500).send('Could not upload document: ' + err);
            } else {
                return res.status(200).send('OK');
            }
        });
    } else {
        return res.status(400).send('File type not allowed');
    }
}


module.exports = {
    uploadFile,
    uploadAvatar,
    uploadDocument
}

/*

da se napravat dva novi end-points za upload na 

1. avatar
2. dokumenti

dvata end-points handler-i treba da zapishuvaat vo soodveten direktorum

avatar: bucket/avatar
dokuments: bucket/documents

sekoj upload-uvan avatar treba da bide imenuvan koristejki go id-to na korisnikot

uid: 223305
file: slika_avatar.jpg
rezultat: 223305.jpg


sekoj upload-uvan dokument treba da ima prefix

uid: 223305
file: cv.pdf
rezultat: 223305_cv.pdf

*/