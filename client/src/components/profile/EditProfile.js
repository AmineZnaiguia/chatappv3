import React, {useState, Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

const EditProfile = props => {
   const [formData, setFormData] = useState({
       company:'',
       location:'',
       status:'',
       skills:'',
       bio:'',
       twitter:'',
       facebook:'',
       linkedin:'',
       youtube:'',
       instagram:'',
   });

   const {
    company,
    location,
    status,
    skills,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
   } = formData
   
   const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})
    return (
        
            <Fragment >
              <h1 className="large text-dark">Create Your Profile</h1>
              <p className="lead">
               <i className='fas fa-user'></i> Let's get some information to make your profile stand out
              </p>
              
              <form className='form' >
                <div className='form-group'>
                <input type='text'
                  placeholder="Status"
                  name="status"
                  value={status}
                  onChange={e=> onChange(e)}
                 
                 
                  info="Give us an idea of where you are at in your career"
                />
                </div>

                <div className="form-group">
                <input  type='text' 
                  placeholder="Company"
                  name="company"
                  value={company}
                  onChange={e=> onChange(e)}
                 
                  info="Could be your own company or one you work for"
                />
                </div>

                <div className="form-group">
                <input type='text'
                  placeholder="Location"
                  name="location"
                  value={location}
                  onChange={e=> onChange(e)}
                  
                  info="City or city  state suggested (eg. Boston, MA)"
                />
                </div>

                <div className="form-group">
                <input type='text'
                  placeholder="* Skills"
                  name="skills"
                  value={skills}
                  onChange={e=> onChange(e)}
                  
                  info="Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP"
                />
                </div>

                <div className="form-group">
                <textarea
                  placeholder="Short Bio"
                  name="bio"
                  value={bio}
                  onChange={e=> onChange(e)}
                  
                  info="Tell us a little about yourself"
                />
                </div>

                <div className="">
                  <button
                    type="button"
                   
                    className="btn btn-light"
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                <div className="form-group">
                <input type='text'
                  placeholder="Twitter"
                  name="Twitter"
                  value={twitter}
                  onChange={e=> onChange(e)}
                  
                  info="City or city  state suggested (eg. Boston, MA)"
                />
                </div>

                <div className="form-group">
                <input type='text'
                  placeholder="Facebook"
                  name="Facebook"
                  value={facebook}
                  onChange={e=> onChange(e)}
                  
                  info="City or city  state suggested (eg. Boston, MA)"
                />
                </div>

                <div className="form-group">
                <input type='text'
                  placeholder="Linkedin"
                  name="Linkedin"
                  value={linkedin}
                  onChange={e=> onChange(e)}
                  
                  info="City or city  state suggested (eg. Boston, MA)"
                />
                </div>
                
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-dark"
                />
                
              </form>
            </Fragment>
         
    )
}

CreateProfile.propTypes = {

}

export default EditProfile
